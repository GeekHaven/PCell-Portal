import axios from 'axios';
import { getLS, removeLS } from '../localStorage';

const API_URL = process.env.API_URL || 'http://localhost:8080/api/v1';

const getAccessToken = () => getLS('jwt_token');

const getHeaders = (token) => {
  if (!token) token = getAccessToken();
  if (token) {
    return {
      headers: {
        Accept: 'application/json',
        Authorization: token,
      },
    };
  }
  return {
    headers: {
      Accept: 'application/json',
    },
  };
};

const get = async (endpoint, token = null) => {
  try {
    let res = await axios.get(API_URL + endpoint, getHeaders(token));
    return res;
  } catch (err) {
    return err.response;
  }
};

const post = async (endpoint, body, token = null, form = false) => {
  let options = getHeaders(token);
  if (form) {
    options.headers['Content-Type'] = 'multipart/form-data';
  }
  try {
    return await axios.post(API_URL + endpoint, body, options);
  } catch (err) {
    return err.response;
  }
};

const update = async (endpoint, body, token = null) => {
  try {
    return await axios.patch(API_URL + endpoint, body, getHeaders(token));
  } catch (err) {
    return err.response;
  }
};

const remove = async (endpoint, token = null) => {
  try {
    return await axios.delete(API_URL + endpoint, getHeaders(token));
  } catch (err) {
    return err.response;
  }
};

const logout = () => {
  removeLS('jwt_token');
};

export {
  getAccessToken,
  post,
  get,
  update,
  remove,
  API_URL,
  getHeaders,
  logout,
};
