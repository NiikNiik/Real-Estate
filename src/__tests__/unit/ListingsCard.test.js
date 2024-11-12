import { render, screen, cleanup } from '@testing-library/react';
import ListingsCard from '../../components/ListingsCard';

describe('ListingsCard Component Unit Tests', () => {
    const mockProps = {
        images: ['test-file-stub', 'test-file-stub'],
        title: '$675,000',
        subtitle: '3 bds | 3 ba | 2,357 sqft - House for sale',
        secondSubtitle: '3101 Memorial St, Alexandria, VA 22306',
        thirdSubtitle: 'RE/MAX EXECUTIVES',
        leftIcon: <span>Stainless appliances</span>,
        rightIcon: <span>Right Icon</span>,
    };

    // Cleanup after each test
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    // Reset modules before each test
    beforeEach(() => {
        jest.resetModules();
    });

    it('renders property price correctly', () => {
        render(<ListingsCard {...mockProps} />);
        expect(screen.getByText('$675,000')).toBeInTheDocument();
    });

    it('renders property details correctly', () => {
        render(<ListingsCard {...mockProps} />);
        expect(screen.getByText('3 bds | 3 ba | 2,357 sqft - House for sale')).toBeInTheDocument();
        expect(screen.getByText('3101 Memorial St, Alexandria, VA 22306')).toBeInTheDocument();
        expect(screen.getByText('RE/MAX EXECUTIVES')).toBeInTheDocument();
    });

    it('renders property feature correctly', () => {
        render(<ListingsCard {...mockProps} />);
        expect(screen.getByText('Stainless appliances')).toBeInTheDocument();
    });
});