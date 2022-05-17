import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokeData = {
  pokemon: {
    id: 151,
    name: 'Mew',
    type: 'Psychic',
    averageWeight: {
      value: '4.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Faraway Island',
        map: 'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
      },
    ],
  },
};

describe('Test Pokemon', () => {
  test('01- Checks if the correct pokemon information is displayed', () => {
    renderWithRouter(<Pokemon pokemon={ pokeData.pokemon } isFavorite={ false } />);
    const pokeInfo = {
      name: screen.getByText(/mew/i),
      type: screen.getByText(/psychic/i),
      weight: screen.getByText(/average weight: 4.0 kg/i),
      img: screen.getByRole('img', { name: /mew sprite/i }),
    };
    const { name, type, weight, img } = pokeInfo;
    expect(name && type && weight).toBeInTheDocument();

    const { image } = pokeData.pokemon;
    expect(img.src).toBe(image);
  });

  test('02- Checks if the details link is correct', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokeData.pokemon }
        isFavorite={ false }
      />,
    );
    const link = screen.getByRole('link');
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/151');
  });

  test('03- checks if the page has the favorite icon', () => {
    renderWithRouter(<Pokemon pokemon={ pokeData.pokemon } isFavorite />);
    const favoritedPoke = screen.getByRole('img', { name: /mew is marked as favorite/i });
    expect(favoritedPoke.src).toContain('/star-icon.svg');
  });
});
