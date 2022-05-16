import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test NotFound', () => {
  test('01- Checks if the page has the text of not found', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(notFoundText).toBeInTheDocument();
  });

  test('02- Checks if the page shows the correct image', () => {
    renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const images = screen.getAllByRole('img');
    const imagesFind = images.some(({ src }) => src === url);
    expect(imagesFind).toBe(true);
  });
});
