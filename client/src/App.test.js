import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard title', () => {
  render(<App />);
  const headerText = screen.getByText(/Dashboard/i);
  expect(headerText).toBeInTheDocument();
});
