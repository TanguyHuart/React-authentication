import { describe, expect, it, test } from 'vitest';
import { sum } from './sum';

describe('sum function', () => {
  // je creée un test , je m'attend à ce que cela soit fasse une somme de deux nombre
  it('should sum two numbers', () => {
    // je m'attend a ce que la somme de 1 et 2 soit 3
    expect(sum(1, 2)).toBe(3);
  });

  it('should sum two string numbers', () => {
    expect(sum('1', '2')).toBe(3);
  });

  it('should throw an error if one of the arguments is not a number', () => {
    expect(() => sum('1', 'a')).toThrowError();
    expect(() => sum('b', '1')).toThrowError();
  });
});
