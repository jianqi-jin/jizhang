import axios from 'axios';
import router from '../router';

const request =
    (url, option) => axios(url, option)
        .then(res => {
            const data = res.data;
            if (data.code === 1001) {
                router.push('/user/login');
            }
            return data;
        });

export const getUserInfo =
    () => request('/interface/user/getUserInfo')
export const login = ({
    username,
    password
}) => request('/interface/user/login', {
    params: {
        username,
        password
    }
});
export const register = ({
    username,
    password
}) => request('/interface/user/register', {
    params: {
        username,
        password
    }
});
export const getAccountDetailList = params => request('/interface/account/getDetailList', {
    params
});
export const getAccountDetail = id => request(`/interface/account/getDetail?id=${id}`);
export const addAccountDetail = params => request('/interface/account/add', {
    params
});
export const editAccountDetail = params => request('/interface/account/edit', {
    params
});
export const editUserInfo = params => request('/interface/user/edit', {params});
export const loginOut = () => request('/interface/user/loginout');
export const getBosToken = params => request('/interface/bos/getBosToken', {
    params
});
export const getChartList = () => request('/interface/account/getChartList');
export const deleteDetail = params => request('/interface/account/delete', {
    params
});
