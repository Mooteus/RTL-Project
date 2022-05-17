import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

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
});
