import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.localStorage.clear();
});

test('renders the student records manager', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /student records manager/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /add student/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add student/i })).toBeInTheDocument();
  expect(screen.getByText(/SRM-1001/i)).toBeInTheDocument();
});
