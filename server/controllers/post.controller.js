import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import Comment from '../models/comment.model.js';

import { isUserEligibleInTarget } from '../utils/queries/isUserEligibleInTarget.js';
import {
  response_200,
  response_400,
  response_404,
  response_500,
} from '../utils/responseCodes.js';
import mongoose from 'mongoose';

export async function getPostById(req, res) {
  try {
    const { postId } = req.params;
    const user = req.user;
    const [post] = await Post.aggregate([
      {
        $addFields: {
          isEligible: isUserEligibleInTarget(user),
        },
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(postId),
          isEligible: true,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          content: 1,
          company: 1,
          createdAt: 1,
          comments: 1,
        },
      },
    ]);

    if (!post) return response_400(res, 'Invalid request');
    return response_200(res, post);
  } catch (error) {
    return response_500(res, error);
  }
}

export async function getAllPosts(req, res) {
  try {
    const user = req.user;
    const { q } = req.query;
    const post = await Post.aggregate([
      {
        $addFields: {
          isEligible: isUserEligibleInTarget(user),
        },
      },
      {
        $match: {
          isEligible: true,
          $or: [
            {
              title: {
                $regex: new RegExp(q),
                $options: 'i',
              },
            },
            {
              description: {
                $regex: new RegExp(q),
                $options: 'i',
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          company: 1,
          createdAt: 1,
          comments: 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    if (!post) return response_400(res, 'Invalid request');
    return response_200(res, post);
  } catch (error) {
    return response_500(res, error);
  }
}

export async function addComment(req, res) {
  try {
    const { content, postId } = req.body;
    let { replyTo } = req.body;
    if (!content || !postId) return response_400(res, 'Invalid request');

    const post = await Post.findById(postId);
    if (!post) return response_400(res, 'Invalid request');

    if (post.comments === 'disabled')
      return response_400(res, 'Comments are disabled for this post');

    const user = req.user;

    let comment = await Comment.create({
      content,
      author: user._id,
      postId,
      private: post.comments === 'private',
      replyTo,
    });

    [comment] = await Comment.aggregate([
      {
        $match: {
          _id: comment._id,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $unwind: '$author',
      },
      {
        $project: {
          _id: 1,
          content: 1,
          'author.name': 1,
          'author.rollNumber': 1,
          private: 1,
          createdAt: 1,
          madeByAdmin: 1,
        },
      },
    ]);
    if (!comment) return response_400(res, 'Invalid request');
    return response_200(res, comment);
  } catch (error) {
    return response_500(res, error);
  }
}

export async function getComments(req, res) {
  try {
    const { postId } = req.params;
    if (!postId) return response_400(res, 'Invalid request');

    const post = await Post.findById(postId);
    if (!post) return response_400(res, 'Invalid request');

    const comments = await Comment.aggregate([
      {
        $match: {
          postId: new mongoose.Types.ObjectId(postId),
          replyTo: null,
          $or: [
            {
              private: false,
            },
            {
              private: true,
              author: new mongoose.Types.ObjectId(req.user._id),
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $unwind: '$author',
      },
      {
        $project: {
          _id: 1,
          content: 1,
          'author.name': 1,
          'author.rollNumber': 1,
          private: 1,
          createdAt: 1,
          madeByAdmin: 1,
        },
      },
    ]);

    if (!comments) return response_400(res, 'Invalid request');

    return response_200(res, comments);
  } catch (error) {
    return response_500(res, error);
  }
}

export async function getReplies(req, res) {
  try {
    const { commentId } = req.params;
    const { postId } = req.params;
    if (!commentId) return response_400(res, 'Invalid request');

    const comment = await Comment.findById(commentId);
    if (!comment) return response_400(res, 'Invalid request');

    const replies = await Comment.aggregate([
      {
        $match: {
          replyTo: new mongoose.Types.ObjectId(commentId),
          postId: new mongoose.Types.ObjectId(postId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $unwind: '$author',
      },
      {
        $project: {
          _id: 1,
          content: 1,
          'author.name': 1,
          'author.rollNumber': 1,
          private: 1,
          createdAt: 1,
          madeByAdmin: 1,
        },
      },
    ]);

    if (!replies) return response_400(res, 'Invalid request');
    return response_200(res, replies);
  } catch (error) {
    return response_500(res, error);
  }
}

export async function deleteCommentById(req, res) {
  try {
    const { commentId } = req.params;
    const author = req.user._id;
    const comment = await Comment.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(commentId),
      author,
    });
    if (!comment) return response_400(res, 'Invalid request');
    return response_200(res, 'Comment deleted successfully');
  } catch (error) {
    return response_500(res, error);
  }
}

export async function updateCommentById(req, res) {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const author = req.user._id;
    const comment = await Comment.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(commentId),
        author,
      },
      {
        content,
      },
      {
        new: true,
      }
    );
    if (!comment) return response_400(res, 'Invalid request');
    return response_200(res, comment);
  } catch (error) {
    return response_500(res, error);
  }
}
