import { render, screen } from '@testing-library/react';
import ListView from '../../components/ListView';

// Mock the child components
jest.mock('../../components/Text', () => {
    return function MockAppText({ children, style }) {
        return <div data-testid="mock-text" style={style}>{children}</div>;
    };
    });

    jest.mock('../../components/TextButton', () => {
    return function MockTextButton({ children }) {
        return <div data-testid="mock-text-button">{children}</div>;
    };
    });

    jest.mock('../../components/ListingsCard', () => {
    return function MockListingsCard({ title, subtitle, secondSubtitle, thirdSubtitle }) {
        return (
        <div data-testid="mock-listing-card">
            <div>{title}</div>
            <div>{subtitle}</div>
            <div>{secondSubtitle}</div>
            <div>{thirdSubtitle}</div>
        </div>
        );
    };
    });

    jest.mock('../../assets/DownChevron', () => {
    return function MockDownChevron() {
        return <div data-testid="mock-down-chevron">▼</div>;
    };
    });

    // Mock image imports
    jest.mock('../../assets/house1A.JPG', () => 'house1A-mock-path');
    // ... other image mocks

    describe('ListView Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the main container with correct styles', () => {
        const { container } = render(<ListView />);
        const mainContainer = container.firstChild;
        
        expect(mainContainer).toHaveStyle({
        boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
        backgroundColor: "rgb(255, 255, 255)",
        position: "absolute",
        top: "75px",
        left: "60.5vw",
        width: "36.5vw",
        height: "88vh",
        padding: "20px",
        overflowY: "scroll"
        });
    });

    it('renders the main title with correct styles', () => {
        render(<ListView />);
        const title = screen.getByText('Real Estate & Homes For Sale');
        expect(title).toHaveStyle({
        fontWeight: 'bold',
        fontSize: '24px',
        textAlign: 'left'
        });
    });

    it('displays correct number of results', () => {
        render(<ListView />);
        expect(screen.getByText('6 results')).toBeInTheDocument();
    });

    it('shows sort button with down chevron', () => {
        render(<ListView />);
        expect(screen.getByText(/Sort: Homes for You/)).toBeInTheDocument();
        expect(screen.getByTestId('mock-down-chevron')).toBeInTheDocument();
    });

    it('renders grid container with correct styles', () => {
        const { container } = render(<ListView />);
        const gridContainer = container.querySelector('[style*="display: grid"]');
        
        expect(gridContainer).toHaveStyle({
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
        });
    });

    it('renders correct number of listing cards', () => {
        render(<ListView />);
        const listingCards = screen.getAllByTestId('mock-listing-card');
        expect(listingCards).toHaveLength(6);
    });

    it('displays all property prices in order', () => {
        render(<ListView />);
        const expectedPrices = [
        '$675,000',
        '$850,000',
        '$720,000',
        '$950,000',
        '$1,200,000',
        '$1,500,000'
        ];

        const prices = screen.getAllByText(/\$[\d,]+/).map(el => el.textContent);
        expect(prices).toEqual(expectedPrices);
    });

    it('displays all real estate agencies', () => {
        render(<ListView />);
        const agencies = [
        'RE/MAX EXECUTIVES',
        'Keller Williams Realty',
        'Century 21',
        'Coldwell Banker',
        "Sotheby's International Realty",
        'Redfin'
        ];

        agencies.forEach(agency => {
        expect(screen.getByText(agency)).toBeInTheDocument();
        });
    });

    it('passes correct props to listing cards', () => {
        render(<ListView />);
        const firstProperty = {
        price: '$675,000',
        details: '3 bds | 3 ba | 2,357 sqft - House for sale',
        address: '3101 Memorial St, Alexandria, VA 22306',
        agency: 'RE/MAX EXECUTIVES'
        };

        expect(screen.getByText(firstProperty.price)).toBeInTheDocument();
        expect(screen.getByText(firstProperty.details)).toBeInTheDocument();
        expect(screen.getByText(firstProperty.address)).toBeInTheDocument();
        expect(screen.getByText(firstProperty.agency)).toBeInTheDocument();
    });
});