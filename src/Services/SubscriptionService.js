import axios from "axios";
import {baseURL} from './Config'

export default class SubscriptionService {
    
    getAllContracts(email) {
        return axios.get(`${baseURL}UserContracts`, {email:email});
    }

    getAllExtras(type) {
        return axios.get(`${baseURL}AllExtras`, {type:type});
    }

    setNewExtras(email, target, type, name){
        return axios.post(`${baseURL}AddExtras` , {email:email, target:target, type:type, name:name});
    }

    deleteExtras(email, target, type, name) {
        return axios.post(`${baseURL}RemoveExtras`, {email: email, target: target, type:type, name:name });
    }
}