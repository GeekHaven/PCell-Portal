import Post from '../models/post.model';
import User from '../models/user.model';
import { isUserEligibleInTarget } from '../utils/queries/isUserEligibleInTarget';
import {
  response_400,
  response_500,
  response_200,
} from '../utils/response.utils';

export async function getPostById(req, res) {
  try {
    const { postId } = req.params;
    const user  = req.user;

    const post = await Post.aggregate([
      {
        $addFields: {
          isEligible: isUserEligibleInTarget(user)
        }
      },
      {
        $match: {
          _id: postId,
          isEligible: true
        },
      }
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

