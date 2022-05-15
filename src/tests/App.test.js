import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const LINK_TEXTS = ['Home', 'About', 'Favorite Pokémons'];
const LINK_PATH = ['/', '/about', '/favorites'];

describe('Test App.js', () => {
  test('01- Checks if the links have the correct text', () => {
    renderWithRouter(<App />);
    const LINKS = screen.getAllByRole('link');
    LINK_TEXTS.forEach((text, i) => {
      expect(LINKS[i]).toHaveTextContent(text);
    });
  });

  LINK_TEXTS.forEach((text, i) => {
    test(`0${i + 2}- Check if the ${text} redict is correct`, () => {
      const { history } = renderWithRouter(<App />);
      const LINK = screen.getByRole('link', { name: text });
      userEvent.click(LINK);
      const { pathname } = history.location;
      expect(pathname).toBe(LINK_PATH[i]);
    });
  });
});
