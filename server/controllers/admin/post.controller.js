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

    if (!title || !description || !target || !content || !comments)
      return response_400(res, 'Invalid request');

    const authorId = req.user._id;

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
  console.log(q);
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

// export async function getAllUserPosts(req, res) {
//     try{
//         const { id } = req.params;
//         const user = await User.findById(id).populate('posts').populate('posts.publicComments');
//         return response_200(res, user.posts);
//     }
//     catch(error){
//         return response_500(res, error);
//     }
// }

// export async function addPublicComment(req, res) {
//   try {
//     const { content, postId, author } = req.body;
//     const post = await Post.findById(postId);
//     if (!post || !content || !author)
//       return response_400(res, 'Invalid request');

//     if (post.comment != 'public')
//       return response_400(res, 'Invalid request');

//     const comment = await Comment.create({
//       content,
//       author,
//       postId,
//       private: false,
//     });

//     post.publicComments.push(comment);
//     post.status = 'unread';
//     post.save();
//     return response_200(res, post);
//   } catch (error) {
//     return response_500(res, error);
//   }
// }

// export async function addPrivateComment(req, res) {
//   try {
//     const { content, postId, author } = req.body;
//     const post = await Post.findById(postId);
//     if (!post || !content || !author)
//       return response_400(res, 'Invalid request');

//     if (post.comment != 'private')
//       return response_400(res, 'Invalid request');

//     const comment = await Comment.create({
//       content,
//       author,
//       postId,
//       private: true,
//     });

//     post.privateComments.push(comment);
//     post.status = 'unread';
//     post.save();
//     return response_200(res, post);
//   } catch (error) {
//     return response_500(res, error);
//   }
// }

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
        $project: {
          _id: 1,
          content: 1,
          author: {
            $arrayElemAt: [
              {
                $map: {
                  input: '$author',
                  in: {
                    name: '$$this.name',
                    rollNumber: '$$this.rollNumber',
                  },
                },
              },
              0,
            ],
          },
          private: 1,
          createdAt: 1,
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
  } catch (error) {
    return response_500(res, error);
  }
}

export async function addComment(req, res) {
  try {
    const { content, postId, replyTo, userId } = req.body;
    if (!content || !postId) return response_400(res, 'Invalid request');

    if (!replyTo) {
      const post = await Post.findById(postId);
      if (!post) return response_400(res, 'Invalid request');

      const user = req.user;

      const comment = await Comment.create({
        content,
        author: user._id,
        postId,
        private: false,
      });

      const comments = await Comment.aggregate([
        {
          $match: {
            postId: new mongoose.Types.ObjectId(postId),
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
          $project: {
            _id: 1,
            content: 1,
            author: {
              $arrayElemAt: [
                {
                  $map: {
                    input: '$author',
                    in: {
                      name: '$$this.name',
                      rollNumber: '$$this.rollNumber',
                    },
                  },
                },
                0,
              ],
            },
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
