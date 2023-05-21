import { get } from './request';

export async function getUserGroups() {
  let res = await get('/admin/user/groups');
  if (res.status === 200) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}
