import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GardenNav from './GardenNav';

describe('<GardenNav />', () => {
  test('it should mount', () => {
    render(<GardenNav />);
    
    const gardenNav = screen.getByTestId('GardenNav');

    expect(gardenNav).toBeInTheDocument();
  });
});