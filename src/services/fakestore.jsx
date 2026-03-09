import axios from 'axios';

const API = axios.create({ baseURL: 'https://fakestoreapi.com' });

export const loginService = async (username, password) => {
    const res = await API.post('/auth/login', { username, password });
    return res.data;
};

export const getAllUsers = async () => {
    const res = await API.get('/users');
    return res.data;
};

export const getUserById = async (id) => {
    const res = await API.get(`/users/${id}`);
    return res.data;
};

export const createUser = async (userData) => {
    const res = await API.post('/users', userData);
    return res.data;
};

export const deleteUser = async (id) => {
    const res = await API.delete(`/users/${id}`);
    return res.data;
};
