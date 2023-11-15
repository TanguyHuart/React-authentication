/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginState {
  formIsVisible: boolean;
  credentials: {
    email: string;
    password: string;
  };
  isLogged: boolean;
  loggedMessage: string;

  error: null | string;
}

export const initialState: LoginState = {
  formIsVisible: false,
  credentials: {
    email: 'bob@mail.io',
    password: 'bobo',
  },
  isLogged: false,
  loggedMessage: '',
  error: null,
};

export const login = createAsyncThunk(
  'form/login',
  async (credentials: { email: string; password: string }) => {
    const { data } = await axios.post<{
      pseudo: string;
      token: string;
      logged: boolean;
    }>('https://orecipes-api.onrender.com/api/login', credentials);
    return data;
  }
);

const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeField(
      state,
      action: PayloadAction<{
        fieldName: keyof LoginState['credentials'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;
      state.credentials[fieldName] = value;
    },
    logout(state) {
      state.isLogged = !state.isLogged;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.rejected, (state) => {
        state.error = 'Email ou mot de passe incorrect';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLogged = action.payload.logged;
        state.loggedMessage = `Bienvenue ${action.payload.pseudo}`;
      });
  },
});

export const { changeField, logout } = loginReducer.actions;

export default loginReducer.reducer;
