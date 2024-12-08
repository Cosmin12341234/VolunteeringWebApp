import axios from 'axios';
import {LoginRequest, User} from "../../utils/types";
import {loginUrl, signupUrl} from "../urlConstants";
import {config, secureConfig} from "../config/apiConfigs";

export const handleSignup = (user: User) => {
    return axios.post(`${signupUrl}`, user, config);
}

export const handleLogin = (request: LoginRequest) => {
    return axios.get(`${loginUrl}`, secureConfig(request.username, request.password));
}