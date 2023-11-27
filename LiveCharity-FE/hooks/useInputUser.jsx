import { useState } from 'react';

import { useRouterCustom } from './useNavigate';

import { loginAPI, registerAPI } from '../src/api/userAPI';
import { notifySucces, notifyError } from '../helpers/notification';

export const useInputUser = (initialState) => {
  const [navigateToRoute] = useRouterCustom();
  const [state, setState] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleAuthentication = async (e, isAuth) => {
    e.preventDefault();
    if (isAuth === 'login') {
      try {
        const message = await loginAPI(state);
        notifySucces(message);

        setTimeout(() => navigateToRoute('/'), 2000);
      } catch (err) {
        notifyError(err);

        setTimeout(() => navigateToRoute('/login'), 2000);
      }
    }

    if (isAuth === 'register') {
      registerAPI(state)
        .then(() => {
          notifySucces('Register success');
          setTimeout(() => navigateToRoute('/login'), 2000);
        })
        .catch((err) => {
          notifyError(err);
        })
      // console.log(state);
    }

    if (isAuth === 'toRegister') navigateToRoute('/register');

    if (isAuth === 'toLogin') navigateToRoute('/login');
  };

  return [state, handleInputChange, handleAuthentication];
};
