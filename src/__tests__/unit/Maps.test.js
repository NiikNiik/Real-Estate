import { render, screen } from '@testing-library/react';
import MapComponent from '../../components/Maps';

// Mock the Google Maps components
jest.mock('@react-google-maps/api', () => ({
    LoadScript: ({ children }) => <div data-testid="load-script">{children}</div>,
    GoogleMap: ({ children, mapContainerStyle, center, zoom }) => (
        <div data-testid="google-map" style={mapContainerStyle}>
        <div data-testid="map-center">
            Lat: {center.lat}, Lng: {center.lng}
        </div>
        <div data-testid="map-zoom">Zoom: {zoom}</div>
        {children}
        </div>
    ),
    }));

    describe('MapComponent', () => {
    beforeEach(() => {
        // Mock the environment variable
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY = 'test-api-key';
    });

    afterEach(() => {
        // Clean up
        delete process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    });

    it('renders LoadScript with correct API key', () => {
        render(<MapComponent />);
        expect(screen.getByTestId('load-script')).toBeInTheDocument();
    });

    it('renders GoogleMap with correct container style', () => {
        render(<MapComponent />);
        const mapElement = screen.getByTestId('google-map');
        
        expect(mapElement).toHaveStyle({
        width: '50vw',
        height: 'calc(100vh - 75px)',
        position: 'absolute',
        top: '75px',
        left: '10.5vw',
        });
    });

    it('centers map on Baltimore coordinates', () => {
        render(<MapComponent />);
        const centerElement = screen.getByTestId('map-center');
        expect(centerElement).toHaveTextContent('Lat: 39.2904, Lng: -76.6122');
    });

    it('sets correct zoom level', () => {
        render(<MapComponent />);
        const zoomElement = screen.getByTestId('map-zoom');
        expect(zoomElement).toHaveTextContent('Zoom: 10');
    });

    it('renders children components when provided', () => {
        const TestChild = () => <div data-testid="test-child">Test Child</div>;
        render(
        <MapComponent>
            <TestChild />
        </MapComponent>
        );
        
        expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });

    it('maintains proper component hierarchy', () => {
        render(<MapComponent />);
        const loadScript = screen.getByTestId('load-script');
        const googleMap = screen.getByTestId('google-map');
        
        expect(loadScript).toContainElement(googleMap);
    });
});