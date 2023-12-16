import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../../../components/@types/decodedToken';
import { IUserMessage } from '../../../components/@types/userMessage';

interface UserState {
  isLogged: string | null;
  username: string | null;
  id: string | null;
  roles: string[] | null;
  permissions: string[] | null;
  accessToken: string;
  refreshToken: string | null;
  isOpen: boolean;
  userMessage: IUserMessage | null;
}

const initialState: UserState = {
  isLogged: localStorage.getItem('accessToken') || null,
  username: localStorage.getItem('username') || null,
  id: localStorage.getItem('userId') || null,
  roles:
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('roles') !== null
      ? localStorage.getItem('roles')!.split(',')
      : [],
  permissions:
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('permission') !== null
      ? localStorage.getItem('permission')!.split(',')
      : [],
  accessToken: localStorage.getItem('accessToken') || '',
  refreshToken: localStorage.getItem('refreshToken') || null,
  isOpen: false,
  userMessage: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (formData: { username: string; password: string }) => {
    try {
      const { data } = await axiosInstance.post('/log/in', formData);
      return data;
    } catch (error) {
      throw new Error();
    }
  }
);

export const logout = createAction<IUserMessage>('user/logout');
export const toggleDropDown = createAction<boolean>('Toggle Dropdown Menu');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      state.isOpen = false;
      state.isLogged = action.payload.data.accessToken;
      const accessToken: DecodedToken = jwt_decode(
        action.payload.data.accessToken
      );
      const { id, username, roles, permissions } = accessToken.data;
      localStorage.setItem('accessToken', action.payload.data.accessToken);
      localStorage.setItem('refreshToken', action.payload.data.refreshToken);
      localStorage.setItem('id', id);
      localStorage.setItem('username', username);
      localStorage.setItem('roles', roles as string);
      localStorage.setItem('permissions', permissions as string);
      state.username = username;
      state.roles = roles as string[];
      state.userMessage = action.payload = {
        name: 'success',
        message: 'Vous êtes connecté(e)',
      };
    })
    .addCase(login.rejected, (state, action) => {
      state.userMessage = action.error = {
        message: "L'identifiant ou le mot de passe est incorrect",
        name: 'error',
      };
      state.isOpen = false;
      state.isLogged = null;
      localStorage.clear();
    })
    .addCase(logout, (state, action) => {
      state.isOpen = false;
      state.isLogged = null;
      localStorage.clear();
      state.userMessage = action.payload = {
        name: 'info',
        message: 'Vous êtes deconnecté(e)',
      };
    })
    .addCase(toggleDropDown, (state) => {
      state.isOpen = !state.isOpen;
    });
});

export default userReducer;
