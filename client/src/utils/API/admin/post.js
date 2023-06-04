import { post, get } from '../request';

export async function addPost({
  title,
  description,
  company,
  comments,
  target,
  content,
}) {

  target.groups = target.groups.map((group) => {
    return {
      year : parseInt(group.year),
      program : group.program,
      minCGPA : parseFloat(group.minCGPA),
      minCredits : parseInt(group.minCredits),
    }
  });
  let body = {
    title,
    description,
    company,
    comments,
    target,
    content,
  };
  let res = await post('/admin/post/new', body);
  if (res.status === 201) {
    return Promise.resolve(res.data.data);
  }
  return Promise.reject(res.data.error);
}

export async function getAllPosts() {
  let res = await get('/admin/post/all');
  if (res.status === 200) {
    return Promise.resolve(res.data.message);
  }
  return Promise.reject(res.data.error);
}