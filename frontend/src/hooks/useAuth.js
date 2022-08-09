import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../utils/api';

export default function useAuth() {

  async function registerUser(user) {
    try {
      const response = await api.post('/users/register', user);
      return response.data

    } catch(error) {
      console.warn(error);
    }
  }

  return { registerUser }
}