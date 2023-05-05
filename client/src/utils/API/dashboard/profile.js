import { get } from '../request';

export async function getProfile() {
  let res = await get('/user');
  if (res.status === 200) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}
