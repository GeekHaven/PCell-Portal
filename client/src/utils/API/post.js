import { post, get } from './request';

export async function getAllPosts({ search = '' }) {
  let res = await get('/post', null, {
    q: search,
  });
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}

export async function getPostById(id) {
  let res = await get(`/post/${id}`);
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}

export async function addCommentUser({ postId, replyTo, content }) {
  const userId = localStorage.getItem('userId');
  let body = {
    postId,
    replyTo,
    content,
    userId,
  };
  let res = await post('/post/comment', body);
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}

export async function getCommentsUser(id) {
  let res = await get(`/post/${id}/comments`);
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}

export async function getRepliesUser({ postId, replyTo }) {
  let res = await get(`/post/${postId}/comment/${replyTo}`);
  console.log(res);
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}