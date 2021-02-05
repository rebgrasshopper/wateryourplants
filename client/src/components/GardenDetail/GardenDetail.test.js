import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GardenDetail from './GardenDetail';

describe('<GardenDetail />', () => {
  test('it should mount', () => {
    render(<GardenDetail />);
    
    const gardenDetail = screen.getByTestId('GardenDetail');

    expect(gardenDetail).toBeInTheDocument();
  });
});