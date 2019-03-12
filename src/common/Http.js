import axios from 'axios';
import {BASE_URL} from './Config';
import history from './History';

let HEADERS = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
};

export const httpGet = (url, params) => {
    return axios.get(`${BASE_URL}/api/v1/${url}${handleParams(params)}`, HEADERS).then(response => {
        return response;
    }).catch(exception => {
        let status = exception.response.status;
        if (status === 401 || status === 403) {
            return tryToRefreshTokens().then(() => {
                return axios.get(`${BASE_URL}/api/v1/${url}${handleParams(params)}`, HEADERS).then(response => {
                    return response;
                }).catch(error => {
                    throw error;
                });
            });
        } else {
            console.log(exception);
        }
    });
};

export const httpPost = (url, data, withFile) => {
    let headers = HEADERS;
    if (withFile) {
        headers.headers['Content-Type'] = 'multipart/form-data';
    }
    return axios.post(`${BASE_URL}/api/v1/${url}`, data, headers).then(response => {
        return response;
    }).catch(exception => {
        let status = exception.response.status;
        if (status === 401 || status === 403) {
            return tryToRefreshTokens().then(() => {
                return axios.post(`${BASE_URL}/api/v1/${url}`, JSON.stringify(data), HEADERS)
                    .then((response) => {
                        return response;
                    });
            }).catch(error => {
                throw error;
            });
        } else {
            console.log(exception);
        }
    });
};

export const login = credentials => {
    return axios.post(`${BASE_URL}/login`, JSON.stringify(credentials), HEADERS).then((response) => {
        handleTokens(response);
        localStorage.setItem('login', response.data.login);
        history.push('/');
    }).catch(exception => {
        console.log(exception);
        return exception;
    });
};

export const registration = data => {
    return axios.post(`${BASE_URL}/security/user/registration`, JSON.stringify(data), HEADERS).then((response) => {
        history.push('/login');
        return response;
    }).catch(exception => {
        console.log(exception);
    });
};

export const logout = () => {
    axios.post(`${BASE_URL}/security/user/logout`, localStorage.getItem('refresh_token'));
    localStorage.clear();
    history.push('/login')
};

export const checkIsLoginExist = (login) => {
    return axios.get(`${BASE_URL}/security/user/${login}/exist`).then(response => {
        return response;
    }).catch(exception => {
        console.log(exception);
    });
};

const tryToRefreshTokens = () => {
    return axios.post(`${BASE_URL}/security/token/refresh`, localStorage.getItem('refresh_token'), HEADERS)
        .then(response => {
            handleTokens(response);
        }).catch(error => {
            history.push('/login');
            throw error;
        });
};

const handleTokens = response => {
    let accessToken = response.data.accessToken;
    let refreshToken = response.data.refreshToken;
    HEADERS.headers.Authorization = `Bearer ${accessToken}`;
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
};

const handleParams = params => {
    if (!params) {
        return '';
    } else {
        let result = '?';
        for (let param of params) {
            if (param.value) {
                result += `${param.name}=${param.value}&`;
            }
        }
        return result.substr(0, result.length - 1);
    }
};