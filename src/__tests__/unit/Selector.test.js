import { render, fireEvent } from '@testing-library/react';
import Selector from '../../components/Selector';
import colors from '../../config/colors';

// Suppress style-related warnings for testing
const originalError = console.error;
beforeAll(() => {
    console.error = (...args) => {
        if (
        args[0].includes('Warning: Removing a style property during rerender') ||
        args[0].includes('Warning: Updating a style property during rerender')
        ) {
        return;
        }
        originalError.call(console, ...args);
    };
});

    afterAll(() => {
    console.error = originalError;
    });

    describe('Selector Component', () => {
    const defaultProps = {
        texts: ['Option 1', 'Option 2', 'Option 3'],
        onSelect: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders all text options', () => {
        const { getByText } = render(<Selector {...defaultProps} />);
        
        defaultProps.texts.forEach(text => {
        expect(getByText(text)).toBeInTheDocument();
        });
    });

    test('handles cell selection', () => {
        const { getByText } = render(<Selector {...defaultProps} />);
        
        fireEvent.click(getByText('Option 2'));
        
        expect(defaultProps.onSelect).toHaveBeenCalledWith('Option 2');
    });

    test('applies correct styles to selected and unselected cells', () => {
        const { getByText } = render(<Selector {...defaultProps} />);
        
        const firstCell = getByText('Option 1');
        const secondCell = getByText('Option 2');
        
        // Test initial state
        expect(firstCell).toHaveStyle({
        backgroundColor: colors.primary,
        color: colors.white
        });
        
        expect(secondCell).toHaveStyle({
        backgroundColor: colors.white,
        color: colors.primary
        });
    });

    test('works without onSelect prop', () => {
        const { getByText } = render(
        <Selector texts={defaultProps.texts} />
        );
        
        expect(() => {
        fireEvent.click(getByText('Option 2'));
        }).not.toThrow();
    });

    test('handles empty text array', () => {
        const { container } = render(<Selector texts={[]} />);
        const selector = container.firstChild;
        expect(selector).toBeInTheDocument();
    });

    test('applies custom dimensions', () => {
        const customProps = {
        ...defaultProps,
        height: '60px',
        width: '500px'
        };

        const { container } = render(<Selector {...customProps} />);
        const selector = container.firstChild;

        expect(selector).toHaveStyle({
        height: '60px',
        width: '500px'
        });
    });
});