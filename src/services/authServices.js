// Purpose:
// - Abstract auth login API backend
// - Keep component layer independent from backend implementation
// - Fetch Bearer Token using this API to authenticate other APIs

import axios from 'axios';
import { AUTH_PAYLOAD } from '../constants/authCred';

const LOGIN_URL = 'https://dev.natureland.hipster-virtual.com/api/v1/login';

export const authService = {
  login: async () => {
    const response = await axios.post(LOGIN_URL, AUTH_PAYLOAD);
    
    const token = response.data?.data?.data?.token?.token;

    if (!token) {
      throw new Error('Token missing from login response');
    }

    return token;
  },
};
