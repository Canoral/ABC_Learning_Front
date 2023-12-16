/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import App from '../../../components/App/App';
import userReducer, {
  login,
  logout,
  toggleDropDown,
} from '../../../redux/store/reducers/user';

const render = (component: React.ReactElement) =>
  rtlRender(
    <Provider store={store}>
      <App />
    </Provider>
  );

describe('userReducer', () => {
  it('should handle login.fulfilled', () => {
    const payload = {
      data: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlwIjoiOjoxIiwiaWQiOjUsInVzZXJuYW1lIjoiQ2FuIiwicm9sZXMiOlsidXNlciJdLCJwZXJtaXNzaW9ucyI6WyJjcnVkX3Rvb2wiXX0sImlhdCI6MTY5NTczMjg3NywiZXhwIjoxNjk1NzM2NDc3fQ.A2SHmFJ5sgUazhE5k3XSomIEZTzaQX5pjd5IXd2oNh8',
      },
    };
    const action = login.fulfilled(payload, '', { username: '', password: '' });
    const newState = userReducer(undefined, action);
    expect(newState.userMessage).toEqual({
      message: 'Vous êtes connecté(e)',
      name: 'success',
    });
  });

  it('should handle login.rejected', () => {
    const action = login.rejected(null, '', { username: '', password: '' });
    const newState = userReducer(undefined, action);

    expect(newState.userMessage).toEqual({
      message: "L'identifiant ou le mot de passe est incorrect",
      name: 'error',
    });
    expect(newState.isLogged).toBe(null);
  });

  it('should handle logout', () => {
    const action = logout({ name: 'info', message: 'Vous êtes deconnecté(e)' });
    const newState = userReducer(undefined, action);

    expect(newState.isLogged).toBe(null);
  });

  it('should handle toggleDropDown', () => {
    const newState = userReducer(undefined, toggleDropDown(true));
    expect(newState.isOpen).toBe(true);
  });
});
