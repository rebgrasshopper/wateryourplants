import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GardenList from './GardenList';

describe('<GardenList />', () => {
  test('it should mount', () => {
    render(<GardenList />);
    
    const gardenList = screen.getByTestId('GardenList');

    expect(gardenList).toBeInTheDocument();
  });
});