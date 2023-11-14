import axios from 'axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Recipe } from '../../@types/recipe';

interface RecipesState {
  list: Recipe[];
  isLoading: boolean;
  error: null | string;
}
export const initialState: RecipesState = {
  list: [],
  isLoading: false,
  error: null,
};

export const getRecipes = createAsyncThunk('home/recipes', async () => {
  const { data } = await axios.get<{ recipe: Recipe[] }>(
    'https://orecipes-api.onrender.com/api/recipes'
  );

  return data;
});

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
        state.list = action.payload.recipe;
      });
  },
});

export const { changeRecipesState } = recipesReducer.actions;

export default recipesReducer.reducer;
