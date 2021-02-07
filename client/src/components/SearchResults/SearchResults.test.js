import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchResults from './SearchResults';

describe('<SearchResults />', () => {
  test('it should mount', () => {
    render(<SearchResults />);
    
    const searchResults = screen.getByTestId('SearchResults');

    expect(searchResults).toBeInTheDocument();
  });
});