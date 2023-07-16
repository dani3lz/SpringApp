import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/'
axios.defaults.headers.post["Content-Type"] = 'application/json'

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token")
};

export const setAuthToken = (token) => {
    return window.localStorage.setItem("auth_token", token)
};

export const checkAuthToken = () => {
    if (getAuthToken() !== null && getAuthToken() !== "null" && getAuthToken() !== "undefined") {
        return true;
    } else {
        return false;
    }
}

export const deleteAuthToken = () => {
    return window.localStorage.removeItem("auth_token")
}

export const request = (method, url, data) => {
    let headers = {};
    if (checkAuthToken()) {
        headers = { "Authorization": `Bearer ${getAuthToken()}` }
    }
    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    });
};