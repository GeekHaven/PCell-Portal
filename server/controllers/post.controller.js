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
    // console.log(q);
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
    const { content, postId, replyTo } = req.body;
    if (!content || !postId) return response_400(res, 'Invalid request');

    if (!replyTo) {
      const post = await Post.findById(postId);
      if (!post) return response_400(res, 'Invalid request');

      if (post.comments === 'disabled')
        return response_400(res, 'Comments are disabled for this post');

      const user = req.user;

      const comment = await Comment.create({
        content,
        author: user._id,
        postId,
        private: post.comments,
      });

      const comments = await Comment.aggregate([
        {
          $match: {
            postId: new mongoose.Types.ObjectId(postId),
            replyTo: null,
          },
        },
        {
          $project: {
            _id: 1,
            content: 1,
            author: 1,
            private: 1,
            createdAt: 1,
          },
        },
      ]);
      return response_200(res, comments);
    } else {
      const user = req.user;

      const comment = await Comment.findById(replyTo);
      if (!comment) return response_400(res, 'Invalid request');

      if (
        comment.private === 'private' &&
        comment.author.toString() !== user._id.toString()
      )
        return response_400(res, 'Invalid request');

      const reply = await Comment.create({
        content,
        author: user._id,
        postId: comment.postId,
        replyTo,
        private: comment.private,
      });

      const replies = await Comment.aggregate([
        {
          $match: {
            postId: new mongoose.Types.ObjectId(comment.postId),
            replyTo: new mongoose.Types.ObjectId(replyTo),
          },
        },
        {
          $project: {
            _id: 1,
            content: 1,
            author: 1,
            private: 1,
            createdAt: 1,
          },
        },
      ]);
      return response_200(res, replies);
    }
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

    // if (post.comments === 'public' || post.comments === 'disabled') {
    //   const comments = await Comment.aggregate([
    //     {
    //       $match: {
    //         postId: new mongoose.Types.ObjectId(id),
    //         replyTo: null,
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: 'users',
    //         localField: 'author',
    //         foreignField: '_id',
    //         as: 'author',
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: '$author',
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //     {
    //       $project: {
    //         _id: 1,
    //         content: 1,
    //         'author.name': 1,
    //         'author.rollNumber': 1,
    //         private: 1,
    //         createdAt: 1,
    //       },
    //     },
    //   ]);
    //   return response_200(res, comments);
    // } else {
    const user = req.user;
    const comments = await Comment.aggregate([
      {
        $match: {
          postId: new mongoose.Types.ObjectId(postId),
          replyTo: null,
          $or: [
            {
              private: 'public',
            },
            {
              $and: [
                {
                  private: 'private',
                },
                {
                  author: new mongoose.Types.ObjectId(user._id),
                },
              ],
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
        $unwind: {
          path: '$author',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          'author.name': 1,
          'author.rollNumber': 1,
          private: 1,
          createdAt: 1,
        },
      },
    ]);
    return response_200(res, comments);
    // }
  } catch (error) {
    return response_500(res, error);
  }
}

export async function getReplies(req, res) {
  try {
    const { commentId } = req.params;
    if (!commentId) return response_400(res, 'Invalid request');

    const comment = await Comment.findById(commentId);
    if (!comment) return response_400(res, 'Invalid request');
    // if (comment.private === 'public') {
    //   const replies = await Comment.aggregate([
    //     {
    //       $match: {
    //         replyTo: new mongoose.Types.ObjectId(commentId),
    //       },
    //     },
    //     {
    //       $project: {
    //         _id: 1,
    //         content: 1,
    //         author: 1,
    //         private: 1,
    //         createdAt: 1,
    //       },
    //     },
    //   ]);
    //   return response_200(res, replies);
    // } else {
    const user = req.user;
    if (!user) return response_400(res, 'Invalid request');
    if (comment.author.toString() !== user._id.toString())
      return response_400(res, 'Invalid request');

    const replies = await Comment.aggregate([
      {
        $match: {
          replyTo: new mongoose.Types.ObjectId(id),
          $or: [
            {
              private: 'public',
            },
            {
              $and: [
                {
                  private: 'private',
                },
                {
                  author: new mongoose.Types.ObjectId(user._id),
                },
              ],
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
        $unwind: {
          path: '$author',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          'author.name': 1,
          'author.rollNumber': 1,
          private: 1,
          createdAt: 1,
        },
      },
    ]);
    return response_200(res, replies);
    // }
  } catch (error) {
    return response_500(res, error);
  }
}
