import { post, get } from '../request';

export async function addNotification({
  title,
  description,
  company,
  comments,
  target,
  content,
}) {
  let body = new FormData();
  body.append('title', title);
  body.append('description', description);
  body.append('company', company);
  body.append('comments', comments);
  body.append('target', target);
  body.append('content', content);
  let res = await post('/admin/notification/new', body, null, true);
  if (res.status === 201) {
    return Promise.resolve(res.data.data);
  }
  return Promise.reject(res.data.error);
}
