import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Create a mock navigate function that we can track
const mockNavigate = jest.fn();

// Mock all required components
jest.mock('./screens/HomeScreen', () => {
  return function MockHomeScreen({ navigate }) {
    return (
      <div data-testid="home-screen">
        <button onClick={() => navigate('login')} data-testid="to-login-button">
          To Login
        </button>
      </div>
    );
  };
});

jest.mock('./screens/LoginScreen', () => {
  return function MockLoginScreen({ navigate }) {
    return (
      <div data-testid="login-screen">
        <button onClick={() => navigate('home')} data-testid="to-home-button">
          To Home
        </button>
      </div>
    );
  };
});

jest.mock('./components/TopNavBar', () => {
  return function MockTopNavBar() {
    return <div data-testid="top-nav-bar">Navigation Bar</div>;
  };
});

// Mock Google Maps related components
jest.mock('@react-google-maps/api', () => ({
  LoadScript: ({ children }) => children,
  GoogleMap: ({ children }) => <div data-testid="google-map">{children}</div>,
}));



describe('App Component', () => {
  beforeEach(() => {
    // Clear mock function calls before each test
    mockNavigate.mockClear();
  });

  it('renders initial home screen with TopNavBar', () => {
    render(<App />);
    expect(screen.getByTestId('home-screen')).toBeInTheDocument();
    expect(screen.getByTestId('top-nav-bar')).toBeInTheDocument();
  });

  it('applies correct margin styling when on home screen', () => {
    render(<App />);
    const contentDiv = screen.getByTestId('home-screen').parentElement;
    expect(contentDiv).toHaveStyle({ marginTop: '95px' });
  });

  it('navigates to login screen and hides TopNavBar', () => {
    render(<App />);
    // Click the navigation button instead of accessing props directly
    fireEvent.click(screen.getByTestId('to-login-button'));
    expect(screen.getByTestId('login-screen')).toBeInTheDocument();
    expect(screen.queryByTestId('top-nav-bar')).not.toBeInTheDocument();
  });

  it('applies no margin styling when on login screen', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('to-login-button'));
    const contentDiv = screen.getByTestId('login-screen').parentElement;
    expect(contentDiv).toHaveStyle({ marginTop: '0' });
  });

  it('returns to home screen from login screen', () => {
    render(<App />);
    // Navigate to login
    fireEvent.click(screen.getByTestId('to-login-button'));
    // Navigate back to home
    fireEvent.click(screen.getByTestId('to-home-button'));
    
    expect(screen.getByTestId('home-screen')).toBeInTheDocument();
    expect(screen.getByTestId('top-nav-bar')).toBeInTheDocument();
  });

  it('maintains consistent state during navigation', () => {
    render(<App />);
    // Navigate to login
    fireEvent.click(screen.getByTestId('to-login-button'));
    expect(screen.getByTestId('login-screen')).toBeInTheDocument();
    
    // Navigate back to home
    fireEvent.click(screen.getByTestId('to-home-button'));
    expect(screen.getByTestId('home-screen')).toBeInTheDocument();
    expect(screen.getByTestId('top-nav-bar')).toBeInTheDocument();
  });
});