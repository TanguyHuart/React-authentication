import { describe, expect, it } from 'vitest';
import { findRecipe } from '../recipes';
import recipes from '../../../data';

// tester findRecipe
// vérifier qu'on nous retourne un objet contenant une propriété id si on passe le premier slug
// vérifier qu'on nous retourne la première recette si on passe le premier slug
// vérifier qu'on nous retourne undefined si on passe une slug bidon

describe('recipes finder', () => {
  it('should return an object with a id attribute when a slug is passed', () => {
    const { slug } = recipes[0];
    const recipe = findRecipe(recipes, slug);

    expect(recipe).toHaveProperty('id');
  });

  it('should return the first recipe if the first slug is passed ', () => {
    const { slug } = recipes[0];
    const recipe = findRecipe(recipes, slug);
    expect(recipe).toEqual(recipes[0]);
  });

  it('should return undefined if a false slug is passed', () => {
    const slug = 'jfjgdifgdpg';
    const recipe = findRecipe(recipes, slug);
    expect(recipe).toBeUndefined();
  });
});
