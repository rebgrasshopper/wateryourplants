import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Landing from './Landing';

describe('<Landing />', () => {
  test('it should mount', () => {
    render(<Landing />);
    
    const landing = screen.getByTestId('Landing');

    expect(landing).toBeInTheDocument();
  });
});