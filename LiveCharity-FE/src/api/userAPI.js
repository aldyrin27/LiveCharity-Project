import axios from 'axios';
import { BASE_URL } from '.';

export const loginAPI = async (userData) => {
  try {
    const { data: response } = await axios.post(BASE_URL + '/users/login', userData);

    localStorage.access_token = response.access_token;
    localStorage.username = response.username;
    localStorage.id = response.id;

    return 'Success login';
  } catch (err) {
    throw err.response.data.message;
  }
};

export const registerAPI = async (userData) => {
  try {
    const { data: response } = await axios.post(BASE_URL + '/users/register', userData);

    return response.message;
  } catch (err) {
    throw err.response.data.message;
  }
};
