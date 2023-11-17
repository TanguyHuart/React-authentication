import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '.';

describe('Card Component', () => {
  it('should render correctly', () => {
    render(
      <Card level="facile" slug="toto" thumbnail="super" title="Hello world" />
    );
    expect(screen.getByText('Hello World')).toBeTruthy();
  });
});
