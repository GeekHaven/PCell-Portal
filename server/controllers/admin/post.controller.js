import User from '../../models/user.model.js';
import Post from '../../models/post.model.js';
import {getEligibleUsersForTarget} from '../../utils/queries/getEligibleUsersForTarget.js';
import {
  response_200,
  response_500,
  response_400,
  response_201,
} from '../../utils/responseCodes.js';

export async function addPost(req, res) {
  try {
    let { title, description, company, comments, target, content } = req.body;

    if (!title || !description || !target || !content || !comments)
      return response_400(res, 'Invalid request');

    const post = await Post.create({
      title,
      description,
      comments : comments.toLowerCase(),
      company,
      targets : target,
      content,
    });

    const eligibleUsers = await User.aggregate([
      {
        $addFields: {
          isEligible: getEligibleUsersForTarget(target),
        },
      },
      {
        $match: {
          isEligible: true,
        },
      },
      //  { $project: { items: { $concatArrays: [ "$instock", "$ordered" ] } } }
      {
        $project: {
          _id: 1,
        },
      },
    ]); 

    eligibleUsers.forEach(async (user) => {
      const userObj = await User.findById(user._id);
      userObj.posts.push(post._id);
      userObj.save();
    });


    return response_201(res, post);
  } catch (error) {
    console.log(error);
    return response_500(res, error);
  }
}

export async function getAllPosts(req, res) {
  try {
    const posts = await Post.aggregate([
     { $project: {
      _id: 1,
      title: 1,
      description: 1,
      company: 1,
      createdAt: 1,
    }},
    {$sort: {
      createdAt: -1,
    }},
    ]);

    return response_200(res, posts);
  } catch (error) {
    return response_500(res, error);
  }
}

export async function getPostById(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
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

export async function addPublicComment(req, res) {
  try {
    const { content, postId, author } = req.body;
    const post = await Post.findById(postId);
    if (!post || !content || !author)
      return response_400(res, 'Invalid request');

    if (post.comment != 'public')
      return response_400(res, 'Invalid request');

    const comment = await Comment.create({
      content,
      author,
      postId,
      private: false,
    });

    post.publicComments.push(comment);
    post.status = 'unread';
    post.save();
    return response_200(res, post);
  } catch (error) {
    return response_500(res, error);
  }
}

export async function addPrivateComment(req, res) {
  try {
    const { content, postId, author } = req.body;
    const post = await Post.findById(postId);
    if (!post || !content || !author)
      return response_400(res, 'Invalid request');

    if (post.comment != 'private')
      return response_400(res, 'Invalid request');

    const comment = await Comment.create({
      content,
      author,
      postId,
      private: true,
    });

    post.privateComments.push(comment);
    post.status = 'unread';
    post.save();
    return response_200(res, post);
  } catch (error) {
    return response_500(res, error);
  }
}
