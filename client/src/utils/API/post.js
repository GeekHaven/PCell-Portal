import { post, get } from './request';

export async function getAllPosts() {
  let res = await get('/post');
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}

export async function getPostById(id) {
  let res = await get(`/post/${id}`);
  console.log(res);
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}
