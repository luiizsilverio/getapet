import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../utils/api';
import useFlashMessage from './useFlashMessage';


export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();

  async function registerUser(user) {
    try {
      const response = await api.post('/users/register', user);
      setFlashMessage(
        'Cadastro realizado com sucesso',
        'success'
      );
      return response.data

    } catch(error) {
      setFlashMessage(error.response.data.error[0], 'error');
    }
  }

  return { registerUser }
}