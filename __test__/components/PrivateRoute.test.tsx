import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from '../../src/components/PrivateRoute';
import { AuthContext } from '../../src/context/AuthContext';
import type { User } from '../../src/types/userType';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: ({ to }: { to: string }) => {
    mockNavigate(to);
    return <div>Redirected to {to}</div>;
  },
}));

const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  managerId: '2',
  role: 'Employee',
  password: 'hashed',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const renderWithAuth = (
  component: React.ReactElement,
  authValue: any
) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={authValue}>
        {component}
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('PrivateRoute', () => {
  it('shows loading spinner when loading', () => {
    renderWithAuth(
      <PrivateRoute><div>Protected Content</div></PrivateRoute>,
      { isAuthenticated: false, user: null, loading: true, login: jest.fn(), logout: jest.fn(), setUser: jest.fn() }
    );

    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    renderWithAuth(
      <PrivateRoute><div>Protected Content</div></PrivateRoute>,
      { isAuthenticated: false, user: null, loading: false, login: jest.fn(), logout: jest.fn(), setUser: jest.fn() }
    );

    expect(screen.getByText(/Redirected to \//)).toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    renderWithAuth(
      <PrivateRoute><div>Protected Content</div></PrivateRoute>,
      { isAuthenticated: true, user: mockUser, loading: false, login: jest.fn(), logout: jest.fn(), setUser: jest.fn() }
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('shows access denied when user role not allowed', () => {
    renderWithAuth(
      <PrivateRoute allowedRoles={['Admin']}><div>Admin Content</div></PrivateRoute>,
      { isAuthenticated: true, user: mockUser, loading: false, login: jest.fn(), logout: jest.fn(), setUser: jest.fn() }
    );

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });

  it('renders children when user role is allowed', () => {
    renderWithAuth(
      <PrivateRoute allowedRoles={['Employee']}><div>Employee Content</div></PrivateRoute>,
      { isAuthenticated: true, user: mockUser, loading: false, login: jest.fn(), logout: jest.fn(), setUser: jest.fn() }
    );

    expect(screen.getByText('Employee Content')).toBeInTheDocument();
  });
});
