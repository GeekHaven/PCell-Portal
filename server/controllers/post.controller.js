import Post from '../models/post.model.js';
import User from '../models/user.model.js';
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
    const user  = req.user;

    const [post] = await Post.aggregate([
      {
        $addFields: {
          isEligible: isUserEligibleInTarget(user)
        }
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(postId),
          isEligible: true
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          content : 1,
          company: 1,
          createdAt: 1,
        },
      }
    ]);

    console.log(post);

    // const post = await Post.findById(postId);

    if (!post) return response_400(res, 'Invalid request');
    return response_200(res, post);
  } catch (error) {
    return response_500(res, error);
  }
}

export async function getAllPosts(req, res) {
  try {
    const user = req.user;
    const post = await Post.aggregate([
      {
        $addFields: {
          isEligible: isUserEligibleInTarget(user),
        },
      },
      {
        $match: {
          isEligible: true,
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

