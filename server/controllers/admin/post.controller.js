import User from '../../models/user.model.js';
import Post from '../../models/post.model.js';
import { getEligibleUsersForTarget } from '../../utils/queries/getEligibleUsersForTarget.js';
import {
  response_200,
  response_500,
  response_400,
  response_201,
} from '../../utils/responseCodes.js';
import Comment from '../../models/comment.model.js';
import mongoose from 'mongoose';

export async function addPost(req, res) {
  try {
    let { title, description, company, comments, target, content } = req.body;

    const authorId = req.user._id;

    if (!title || !description || !target || !content || !comments)
      return response_400(res, 'Invalid request');

    const post = await Post.create({
      title,
      description,
      comments: comments.toLowerCase(),
      company,
      authorId,
      targets: target,
      content,
    });

    return response_201(res, post);
  } catch (error) {
    console.log(error);
    return response_500(res, error);
  }
}

export async function getAllPosts(req, res) {
  const { q } = req.query;
  try {
    const posts = await Post.aggregate([
      {
        $match: {
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

    return response_200(res, posts);
  } catch (error) {
    return response_500(res, error);
  }
}

export async function getPostById(req, res) {
  try {
    const { id } = req.params;
    const [post] = await Post.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
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
          title: 1,
          description: 1,
          content: 1,
          company: 1,
          createdAt: 1,
          'author.name': 1,
        },
      },
    ]);
    if (!post) return response_400(res, 'Invalid request');
    return response_200(res, post);
  } catch (error) {
    return response_500(res, error);
  }
}

export async function deletePostById(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) return response_400(res, 'Invalid request');
    return response_200(res, 'Post deleted successfully');
  } catch (error) {
    return response_500(res, error);
  }
}

export async function getComments(req, res) {
  try {
    const { id } = req.params;
    const comments = await Comment.aggregate([
      {
        $match: {
          postId: new mongoose.Types.ObjectId(id),
          replyTo: null,
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
    return response_200(res, comments);
  } catch (error) {
    return response_500(res, error);
  }
}

export async function getReplies(req, res) {
  try {
    const { id } = req.params;
    const replies = await Comment.aggregate([
      {
        $match: {
          replyTo: new mongoose.Types.ObjectId(id),
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
    return response_200(res, replies);
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
    }

    const user = req.user;

    let comment = await Comment.create({
      content,
      author: user._id,
      postId,
      private: false,
      replyTo,
      madeByAdmin: true,
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

export async function deleteCommentById(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) return response_400(res, 'Invalid request');
    return response_200(res, 'Comment deleted successfully');
  } catch (error) {
    return response_500(res, error);
  }
}

export async function updateCommentById(req, res) {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const author = req.user._id;
    const comment = await Comment.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
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
