import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PlantCard from './PlantCard';

describe('<PlantCard />', () => {
  test('it should mount', () => {
    render(<PlantCard />);
    
    const plantCard = screen.getByTestId('PlantCard');

    expect(plantCard).toBeInTheDocument();
  });
});