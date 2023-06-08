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
