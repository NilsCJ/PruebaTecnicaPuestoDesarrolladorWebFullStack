'use client';
import axios from 'axios';

const useAxios = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return instance;
};

export default useAxios;
