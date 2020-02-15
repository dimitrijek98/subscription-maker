import axios from 'axios';
import {baseURL} from './Config';
import {AsyncStorage} from 'react-native';

export default class AuthService {
  login(email, password) {
    return axios.post(`${baseURL}LogIn`, {password, email});
  }

  getUserContracts(email) {
    return axios.post(`${baseURL}UserContracts`, {email});
  }

  getAllExtras(type) {
    return axios.get(`${baseURL}AllExtras`, {params: {type}});
  }

  addExtra(type, name, email, target) {
    return axios.post(`${baseURL}AddExtras`);
  }

  setUser(user) {
    const jsonUser = JSON.stringify(user);
    return AsyncStorage.setItem('user', jsonUser);
  }

  async getUser() {
    const jsonUser = await AsyncStorage.getItem('user');
    return JSON.parse(jsonUser);
  }
}
