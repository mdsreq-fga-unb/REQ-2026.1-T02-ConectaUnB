import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    return <img alt="" {...props} />;
  },
}));

describe('Home Page', () => {
  it('should render the page heading', () => {
    render(<Home />);
    expect(screen.getByText(/To get started, edit the page.tsx file/i)).toBeInTheDocument();
  });

  it('should render Deploy Now link', () => {
    render(<Home />);
    expect(screen.getByText('Deploy Now')).toBeInTheDocument();
  });

  it('should render Documentation link', () => {
    render(<Home />);
    expect(screen.getByText('Documentation')).toBeInTheDocument();
  });
});
