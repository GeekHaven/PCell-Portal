import { get } from '../request';

export async function getPublicIndividualCompany(id) {
  let res = await get(`/public/company/${id}`);
  console.log('sex');
  if (res.status === 200) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}
