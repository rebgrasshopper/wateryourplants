import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DetailView from './DetailView';

describe('<DetailView />', () => {
  test('it should mount', () => {
    render(<DetailView />);
    
    const detailView = screen.getByTestId('DetailView');

    expect(detailView).toBeInTheDocument();
  });
});