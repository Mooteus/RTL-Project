import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Test FavoritePokemons', () => {
  test('01- Checks if it displays a message "no favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFountText = screen.getByText(/No favorite pokemon found/i);
    expect(notFountText).toBeInTheDocument();
  });
});
