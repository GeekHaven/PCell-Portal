import { get, post } from '../request';

export async function getProfile() {
  let res = await get('/user');
  if (res.status === 200) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}
export async function saveChanges({ password, mobile, resumeLink }) {
  let res = await post('/user/saveChanges', {
    // password,
    mobile,
    resumeLink,
  });
  if (res.status === 200) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}
export async function updateCourseDetails({ password }) {
  let res = await post('/user/updateCourseDetails', {
    password,
  });
  if (res.status === 200) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}
