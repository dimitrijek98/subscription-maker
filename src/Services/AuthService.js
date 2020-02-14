import axios from "axios";
import {baseURL} from './Config'

export default class AuthService {

    login(email, password) {
        return axios.post(`${baseURL}LogIn`, {password, email});
    }

    setUser(user) {
        const jsonUser = JSON.stringify(user);
        localStorage.setItem('user', jsonUser);
    }

    getUser() {
        const jsonUser = localStorage.getItem('user');
        return JSON.parse(jsonUser);
    }
}