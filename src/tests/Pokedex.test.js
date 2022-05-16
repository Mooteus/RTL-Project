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

const types = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

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

  test('02- Check "Proximo Pokemon" button', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritedPokemons }
    />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(nextButton);
    });
    const firstPokemon = screen.getByText(pokemons[0].name);
    expect(firstPokemon).toBeInTheDocument();
  });

  // test('03- ', () => {
  //   const pokemonName = screen.getAllByTestId('pokemon-name');
  //   expect(pokemonName.length).toBe(1);
  // });

  test('03- Check if the filter buttons exist', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritedPokemons }
    />);
    types.forEach((type) => {
      const filterButton = screen.getByRole('button', { name: type });
      expect(filterButton).toBeInTheDocument();
    });
    const ButtonAll = screen.getByRole('button', { name: /all/i });
    expect(ButtonAll).toBeInTheDocument();
  });
});
