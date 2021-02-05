import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PlantDetails from './PlantDetails';

describe('<PlantDetails />', () => {
  test('it should mount', () => {
    render(<PlantDetails />);
    
    const plantDetails = screen.getByTestId('PlantDetails');

    expect(plantDetails).toBeInTheDocument();
  });
});