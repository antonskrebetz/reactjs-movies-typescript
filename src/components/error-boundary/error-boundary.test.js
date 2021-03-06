import { render, screen } from '@testing-library/react';
import ErrorBoundary from './error-boundary';

describe('Test ErrorBoundary component', () => {
  beforeEach(() => {
    render(<ErrorBoundary/>);
  })

  test('has an error image when state.error: true', () => {
    const img = screen.getByRole('img');
    expect(img).toBeDefined();
  });
});