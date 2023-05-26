import { post, get } from '../request';

export async function addCompany({
  companyName,
  techStack,
  files,
  target,
  hidden,
}) {
  let logo = await (await fetch(files[0].src)).blob();
  let body = new FormData();
  body.append('name', companyName);
  body.append('techStack', techStack);
  body.append('logo', logo);
  body.append('hidden', hidden);
  body.append('targets', JSON.stringify(target));
  let res = await post('/admin/company/new', body, null, true);
  if (res.status === 201) {
    return Promise.resolve(res.data.data);
  }
  return Promise.reject(res.data.error);
}

export async function getPaginatedCompanies({
  sort = 1,
  search = '',
  sortBy = 'name',
  page = '1',
  limit = '10',
}) {
  let res = await get(`/admin/company`, null, {
    sort,
    q: search,
    sortBy,
    page,
    limit,
  });
  if (res.status === 200) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}

export async function updateCompany({}) {}
