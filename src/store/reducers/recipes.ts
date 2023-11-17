import axios from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Recipe } from '../../@types/recipe';
import { axiosInstance } from '../../utils/axios';

interface RecipesState {
  list: Recipe[];
  favorites: Recipe[];
  isLoading: boolean;
  error: null | string;
}
export const initialState: RecipesState = {
  list: [],
  favorites: [],
  isLoading: true,
  error: null,
};

export const getRecipes = createAsyncThunk('recipes/fetch', async () => {
  const { data } = await axiosInstance.get<Recipe[]>('/recipes');

  return data;
});

export const getFavoriteRecipes = createAsyncThunk(
  'recipes/fetch-favorites',
  async () => {
    const { data } = await axiosInstance.get<{ favorites: Recipe[] }>(
      '/favorites'
    );

    return data;
  }
);

const recipesReducer = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    changeRecipesState(state, action: PayloadAction<Recipe[]>) {
      state.list = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRecipes.rejected, (state) => {
        state.error = 'Problème lors de la récupération des recettes';
        state.isLoading = false;
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(getFavoriteRecipes.fulfilled, (state, action) => {
        state.favorites = action.payload.favorites;
      });
  },
});

export const { changeRecipesState } = recipesReducer.actions;

export default recipesReducer.reducer;
