import axios from 'axios';
import {baseURL} from './Config';

export default class SubscriptionService {
  getAllContracts(email) {
    return axios.post(`${baseURL}UserContracts`, {email: email});
  }

  getConcreteContract(email, target) {
    return axios.get(`${baseURL}FindConcrectContract`, {params: {target, email}});
  }

  getAllExtras(type) {
    return axios.get(`${baseURL}AllExtras`, {params: {type}});
  }

  setNewExtras(data) {
    return axios.post(`${baseURL}AddExtras`, {
      email: data.email,
      target: data.target,
      type: data.type,
      name: data.name,
    });
  }

  deleteExtras(data) {
    return axios.post(`${baseURL}RemoveExtras`, {
      email: data.email,
      target: data.target,
      type: data.type,
      name: data.name,
    });
  }
}
