import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const favoritedPokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  },
  {
    id: 151,
    name: 'Mew',
    type: 'Psychic',
    averageWeight: {
      value: '4.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
  },
];

describe('Test FavoritePokemons', () => {
  test('01- Checks if it displays a message "no favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFountText = screen.getByText(/No favorite pokemon found/i);
    expect(notFountText).toBeInTheDocument();
  });

  test('02- Checks if favorite pokemons are displayed on the screen', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoritedPokemons } />);
    favoritedPokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
