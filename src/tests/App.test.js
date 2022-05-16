import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const linkTexts = ['Home', 'About', 'Favorite Pokémons'];
const linkPath = ['/', '/about', '/favorites'];

describe('Test App.js', () => {
  test('01- Checks if the links have the correct text', () => {
    renderWithRouter(<App />);
    const link = screen.getAllByRole('link');
    linkTexts.forEach((text, i) => {
      expect(link[i]).toHaveTextContent(text);
    });
  });

  linkTexts.forEach((text, i) => {
    test(`0${i + 2}- Check if the ${text} redict is correct`, () => {
      const { history } = renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: text });
      userEvent.click(link);
      const { pathname } = history.location;
      expect(pathname).toBe(linkPath[i]);
    });
  });

  test('05- Check if the not found page works', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/GEN98');
    const notFoundText = screen.getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
