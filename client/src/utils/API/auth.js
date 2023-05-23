import { getLS, storeLS } from '../localStorage';
import { get, post, logout } from './request';

export async function loginUser(username, password, remember) {
  let res = await post('/auth/login', { username, password });
  if (res.status === 201 || res.status === 200) {
    storeLS('jwt_token', res.data.data.token, remember);
    return Promise.resolve(res.data.data);
  }
  return Promise.reject(res.data.message);
}

export async function isUserAuthenticated() {
  if (!getLS('jwt_token')) return Promise.resolve(false);
  let res = await get('/auth/verify');
  if (res.status === 200 && res.data?.data?.status)
    return Promise.resolve({
      rollNumber: res.data.data.rollNumber,
      isAdmin: res.data.data.isAdmin,
    });
  logout();
  return Promise.resolve(false);
}

export async function isUserAdmin() {
  if (!getLS('jwt_token')) return Promise.resolve(false);
  let res = await get('/auth/isAdmin');
  if (res.status === 200 && res.data?.data?.status)
    return Promise.resolve(res.data.data.isAdmin);
  return Promise.resolve(false);
}
