import axios from 'axios';

const BASE_URL = 'https://aviral.iiita.ac.in/api/';

export const getAviralData = async (username, password) => {
  let data = {};
  await axios
    .post(BASE_URL + 'login/', { username: username?.toLowerCase(), password })
    .then((res) => {
      if (res.data['user_group']) {
        return {
          Authorization: res.data['jwt_token'],
          Session: res.data['session_id'],
        };
      }
    })
    .then((auth) => {
      return axios.get(BASE_URL + 'student/dashboard/', {
        headers: auth,
      });
    })
    .then((res) => {
      data = {
        name:
          res.data['first_name'] +
          ' ' +
          res.data['middle_name'] +
          ' ' +
          res.data['last_name'],

        semester: res.data['semester'],
        rollNumber: res.data['student_id'],
        mobile: res.data['phone'],
        cgpa: res.data['cgpi'],
        completedCredits: `${res.data['completed_total']} / ${res.data['total_credits']}`,
      };
    })
    .catch((err) => console.log(err.message));
  return data;
};

export const verifyAviralPassword = async (username, password) => {
  let flag = false;
  await axios
    .post(BASE_URL + 'login/', { username: username?.toLowerCase(), password })
    .then((res) => {
      if (res.data['user_group']) flag = true;
    })
    .catch((err) => console.log(err.message));
  return flag;
};
