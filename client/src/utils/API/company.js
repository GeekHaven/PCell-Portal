import { get, post } from './request';

export async function getPaginatedCompanies({
  onlyEligible = true,
  sort = 1,
  search = '',
  sortBy = 'name',
  page = '1',
  limit = '10',
}) {
  let res = await get(`/company`, null, {
    onlyEligible,
    sort,
    q: search,
    sortBy,
    page,
    limit,
  });
  if (res.status === 200) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}

export async function getIndividualCompany(id) {
  let res = await get(`/company/${id}`);
  if (res.status === 200) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}

export async function registerUserToCompany(id) {
  let res = await post(`/company/${id}/register`);
  if (res.status === 201) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}
