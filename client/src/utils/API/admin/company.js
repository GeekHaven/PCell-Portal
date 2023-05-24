import { post } from '../request';

export async function addCompany({ companyName, techStack, files, target }) {
  let targets = { ...target };
  targets.include = targets.include.map((e) => e.rollNumber);
  targets.exclude = targets.exclude.map((e) => e.rollNumber);
  let logo = await (await fetch(files[0].src)).blob();
  let body = new FormData();
  body.append('name', companyName);
  body.append('techStack', techStack);
  body.append('logo', logo);
  body.append('targets', JSON.stringify(targets));
  let res = await post('/admin/company/new', body, null, true);
  if (res.status === 201) {
    return Promise.resolve(res.data.data);
  }
  return Promise.reject(res.data.error);
}
export async function updateCompany({}) {}
