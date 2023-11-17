/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from '../../utils/axios';
import { LocalStorage } from '../../utils/LocalStorage';

interface LoginState {
  isLoading: boolean;
  formIsVisible: boolean;
  credentials: {
    email: string;
    password: string;
  };
  pseudo?: string;
  token?: string;
  logged: boolean;
  loggedMessage: string;

  error: null | string;
}

type UserData = {
  pseudo: string;
  token: string;
  logged: boolean;
};
// Je vais récupérer les données de l'utilisateur dans le local storage
const userData = LocalStorage.getItem('user');

export const initialState: LoginState = {
  isLoading: false,
  formIsVisible: false,
  credentials: {
    email: 'bob@mail.io',
    password: 'bobo',
  },
  logged: false,
  loggedMessage: '',
  error: null,
  ...userData,
};

export const login = createAsyncThunk(
  'form/login',
  async (credentials: { email: string; password: string }) => {
    const { data } = await axiosInstance.post<UserData>('/login', credentials);
    // Lorsque je me connecte, je stocke le token d'authorization dans axios
    // Ce header sera envoyé automatiquement à chaque requête avec `axiosInstance`
    // axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    // axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    // Je vais enregistrer dans le localStorage les données de l'utilisateur
    // localStorage me permet de stocker des données dans le navigateur sous la forme de clé/valeur
    // La clé me permet de pouvoir récupérer / modifier / supprimer la valeur
    // La valeur DOIT être une chaine de caractère. On transforme donc notre objet en chaines de caractères
    LocalStorage.setItem('user', data);
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
      state.logged = !state.logged;
      state.pseudo = undefined;
      state.token = undefined;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Email ou mot de passe incorrect';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logged = action.payload.logged;
        state.loggedMessage = `Bienvenue ${action.payload.pseudo}`;
        state.pseudo = action.payload.pseudo;
        state.token = action.payload.token;
      });
  },
});

export const { changeField, logout } = loginReducer.actions;

export default loginReducer.reducer;
