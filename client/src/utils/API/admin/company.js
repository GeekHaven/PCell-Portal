import { post, get, remove, update } from '../request';

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

export async function getAllCompanies() {
  let res = await get('/admin/company/all');
  if (res.status === 200) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}
export async function getCompanyById(id) {
  let res = await get(`/admin/company/${id}`);
  if (res.status === 200) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
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

export async function getCompanyUsers(id) {
  let res = await get(`/admin/company/${id}/users`);
  if (res.status === 200) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}

export async function editCompanyUsers({ id, relations }) {
  let res = await post(`/admin/company/${id}/users/update`, { relations });
  if (res.status === 201) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}

export async function setCompanyVisibility({ id, hidden }) {
  let res = await post(`/admin/company/${id}/hidden`, { hidden });
  if (res.status === 201) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}

export async function setCompanyStatus({ id, status }) {
  let res = await post(`/admin/company/${id}/status`, { status });
  if (res.status === 201) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}

export async function setCompanyStatusWithEditCompanyUsers({
  id,
  status,
  relations,
}) {
  let tasks = [];
  tasks.push(setCompanyStatus({ id, status }));
  tasks.push(editCompanyUsers({ id, relations }));
  try {
    await Promise.all(tasks);
  } catch (err) {
    return Promise.reject(err);
  }
  return Promise.resolve();
}

export async function deleteCompany(id) {
  let res = await remove(`/admin/company/${id}`);
  if (res.status === 200) return Promise.resolve(res.data.data);
  return Promise.reject(res.data.message);
}

export async function editCompany({
  companyName,
  techStack,
  files,
  target,
  id,
}) {
  let logo = await (await fetch(files[0].src)).blob();
  let body = new FormData();
  body.append('name', companyName);
  body.append('techStack', techStack);
  body.append('logo', logo);
  body.append('targets', JSON.stringify(target));
  let res = await update(`/admin/company/${id}`, body, null, true);
  if (res.status === 201) {
    return Promise.resolve(res.data.data);
  }
  return Promise.reject(res.data.error);
}
