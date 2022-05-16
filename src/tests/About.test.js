import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Test About', () => {
  test('01- Checks if it has an "h2" with the text "About Pokédex"', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { name: /about pokédex/i });
    expect(title).toBeInTheDocument();
  });
});
