import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

const foundAt = [
  {
    location: 'Johto Route 30',
    map: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
  },
  {
    location: 'Johto Route 31',
    map: 'https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
  },
  {
    location: 'Ilex Forest',
    map: 'https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
  },
  {
    location: 'Johto National Park',
    map: 'https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
  },
];

describe('Test PokemonDetais', () => {
  test('01- Checks if the detailed information of pokemon is shown', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/10');

    const pokeName = screen.getByText(/caterpie details/i);
    const linkDetails = screen.queryByRole('link', { name: /more details/i });
    const detailsTitle = screen.getByRole('heading', { level: 2, name: /summary/i });
    const details = screen.getByText(data[2].summary);

    expect(linkDetails).not.toBeInTheDocument();
    expect(details && detailsTitle && pokeName).toBeInTheDocument();
  });

  test('02- Checks Routes map', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/10');

    const routes = screen.getAllByRole('img', { name: /caterpie location/i });
    routes.forEach(({ src }, i) => {
      expect(src).toBe(foundAt[i].map);
    });

    const locationTitle = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Caterpie/i,
    });
    expect(locationTitle).toBeInTheDocument();
  });
});
