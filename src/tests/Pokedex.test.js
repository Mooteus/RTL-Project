import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const favoritedPokemons = pokemons.reduce((acc, { id }) => {
  acc[id] = false;
  return acc;
}, {});

describe('Test Pokedex', () => {
  test('01- Checks if the component has the correct title', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritedPokemons }
    />);
    const title = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });
});
