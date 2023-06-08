import { post, get, remove } from '../request';

export async function addPost({
  title,
  description,
  company,
  comments,
  target,
  content,
}) {
  target.groups = target.groups.map((group) => {
    return {
      year: parseInt(group.year),
      program: group.program,
      minCGPA: parseFloat(group.minCGPA),
      minCredits: parseInt(group.minCredits),
    };
  });
  let body = {
    title,
    description,
    company,
    comments,
    target,
    content,
  };
  let res = await post('/admin/post/new', body);
  if (res.status === 201) {
    return Promise.resolve(res.data.data);
  }
  return Promise.reject(res.data.error);
}

export async function getAllPosts({ search = '' }) {
  let res = await get('/admin/post/', null, { q: search });
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}

export async function getPostById(id) {
  let res = await get(`/admin/post/${id}`);
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}

export async function addComment({ postId, replyTo, content }) {
  const userId = localStorage.getItem('userId');
  let body = {
    postId,
    replyTo,
    content,
    userId,
  };
  let res = await post('/admin/post/comment', body);
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}

export async function getComments(id) {
  let res = await get(`/admin/post/${id}/comments`);
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}

export async function getReplies( {postId, replyTo} ) {
  let res = await get(`/admin/post/${postId}/comment/${replyTo}`);
  console.log(res);
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}

export async function deletePost(id) {
  let res = await remove(`/admin/post/${id}`);
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}
