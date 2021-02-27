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
export const getChartList = params => request('/interface/account/getChartList', {params});
export const deleteDetail = params => request('/interface/account/delete', {
    params
});
export const getChannelList = () => request('/interface/channel/getList');
export const addChannel = params => request('/interface/channel/add', {
    params
});
export const editChannel = params => request('/interface/channel/edit', {
    params
});
export const deleteChannel = params => request('/interface/channel/delete', {
    params
});

export const getGoodList = params => request('/interface/good/getList', {params});
export const addGood = params => request('/interface/good/add', {
    params
});
export const editGood = params => request('/interface/good/edit', {
    params
});
export const getGoodDetail = id => request(`/interface/good/getDetail?id=${id}`);
export const deleteGood = params => request('/interface/good/delete', {
    params
});
