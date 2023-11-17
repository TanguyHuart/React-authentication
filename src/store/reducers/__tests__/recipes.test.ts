import { describe, expect, it } from 'vitest';
import recipesReducer, { getRecipes } from '../recipes';
import fakeRecipes from '../../../data';
// Je décrie une suite de test pour mon recipes reducer
// Que souhaite-je tester ?
// - Que le reducer retourne le bon state initial (mon isLoading doit être à vrai)
// - Que le reducer retourne les bonnes données en fonction des intentions / actions émises
describe('recipes reducer', () => {
  it('should have isLoading to true by default', () => {
    // J'exécute mon reducer avec un state undefined et une action vide
    // Cela me permet de récupérer le state initial
    const state = recipesReducer(undefined, { type: '' });

    // je m'attend a ce que isLoading est vrai
    expect(state.isLoading).toBe(true);
  });

  it('should set isLoading to true when fetching recipes', () => {
    const currentState = {
      isLoading: false,
      list: [],
      error: null,
    };
    const newState = recipesReducer(currentState, getRecipes.pending);
    expect(newState.isLoading).toBe(true);
  });

  it('should handle fetchRecipes.fullfilled', () => {
    const action = getRecipes.fulfilled(fakeRecipes, 'requestId');
    const currentState = {
      list: [],
      isLoading: true,
      error: null,
    };

    const newState = recipesReducer(currentState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.list).toEqual(fakeRecipes);
  });
});
