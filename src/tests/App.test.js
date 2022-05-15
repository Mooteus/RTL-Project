import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test App.js', () => {
  test('01- Checks if the links have the correct text', () => {
    renderWithRouter(<App />);
    const TEXTS = ['Home', 'About', 'Favorite Pokémons'];
    const LINK_TEST = screen.getAllByRole('link');
    TEXTS.forEach((text, i) => {
      expect(LINK_TEST[i]).toHaveTextContent(text);
    });
  });
});
