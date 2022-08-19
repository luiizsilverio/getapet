import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../utils/api';
import useFlashMessage from './useFlashMessage';


export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('getapet:token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, [])


  async function registerUser(user) {
    try {
      const response = await api.post('/users/register', user);
      setFlashMessage(
        'Cadastro realizado com sucesso',
        'success'
      );

      await authUser(response.data);
      return response.data

    } catch(error) {
      if (typeof error.response.data.error === 'string') {
        setFlashMessage(error.response.data.error, 'error');
      } else {
        setFlashMessage(error.response.data.error[0], 'error');
      }
    }
  }


  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem('getapet:token', JSON.stringify(data.token));
    navigate('/');
  }


  function logout() {
    localStorage.removeItem('getapet:token');
    api.defaults.headers.Authorization = undefined;
    setAuthenticated(false);
    navigate('/');
    setFlashMessage('Logout realizado com sucesso', 'success');
  }


  async function login(user) {
    try {
      const response = await api.post('/users/login', user);

      await authUser(response.data);

      setFlashMessage('Login realizado com sucesso', 'success');

    } catch (error) {
      if (typeof error.response.data.error === 'string') {
        setFlashMessage(error.response.data.error, 'error');
      } else {
        setFlashMessage(error.response.data.error[0], 'error');
      }
    }
  }

  return { registerUser, login, logout, authenticated }
}