import { render, screen, fireEvent } from '@testing-library/react';
import RoundCheckbox from '../../components/RoundCheckbox';
import colors from '../../config/colors';

// Mock styles
jest.mock('../../config/styles', () => ({
    RoundcheckboxContainer: {
        cursor: 'pointer',
        position: 'relative',
        width: '20px',
        height: '20px',
    },
    checkboxCheck: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxInput: {
        opacity: 0,
        position: 'absolute',
    }
    }));

    describe('RoundCheckbox Component', () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders unchecked by default', () => {
        render(<RoundCheckbox />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
    });

    test('toggles checked state on click', () => {
        render(<RoundCheckbox onChange={mockOnChange} />);
        const checkboxContainer = screen.getByRole('checkbox').parentElement;
        
        // Click to check
        fireEvent.click(checkboxContainer);
        expect(screen.getByText('✓')).toBeVisible();
        expect(mockOnChange).toHaveBeenCalledWith(true);

        // Click to uncheck
        fireEvent.click(checkboxContainer);
        expect(screen.queryByText('✓')).not.toBeVisible();
        expect(mockOnChange).toHaveBeenCalledWith(false);
    });

    test('changes appearance based on checked state', () => {
        render(<RoundCheckbox onChange={mockOnChange} />);
        const checkboxContainer = screen.getByRole('checkbox').parentElement;

        // Initial state
        expect(checkboxContainer).toHaveStyle({
        backgroundColor: 'transparent',
        color: colors.primary
        });

        // Checked state
        fireEvent.click(checkboxContainer);
        expect(checkboxContainer).toHaveStyle({
        backgroundColor: colors.primary,
        color: colors.white
        });
    });

    test('applies hover styles', () => {
        render(<RoundCheckbox />);
        const checkboxContainer = screen.getByRole('checkbox').parentElement;

        // Initial state
        expect(checkboxContainer).toHaveStyle({ opacity: 1 });

        // Hover state
        fireEvent.mouseEnter(checkboxContainer);
        expect(checkboxContainer).toHaveStyle({ opacity: 0.9 });

        // Exit hover
        fireEvent.mouseLeave(checkboxContainer);
        expect(checkboxContainer).toHaveStyle({ opacity: 1 });
    });

    test('applies active styles on mouse down', () => {
        render(<RoundCheckbox />);
        const checkboxContainer = screen.getByRole('checkbox').parentElement;

        // Mouse down
        fireEvent.mouseDown(checkboxContainer);
        expect(checkboxContainer).toHaveStyle({ opacity: 0.8 });

        // Mouse up
        fireEvent.mouseUp(checkboxContainer);
        expect(checkboxContainer).toHaveStyle({ opacity: 1 });
    });

    test('applies custom styles without overriding core styles', () => {
        const customStyle = {
        margin: '10px',
        padding: '5px'
        };

        render(<RoundCheckbox style={customStyle} />);
        const checkboxContainer = screen.getByRole('checkbox').parentElement;

        expect(checkboxContainer).toHaveStyle({
        ...customStyle,
        border: `2px solid ${colors.primary}`
        });
    });

    test('handles click without onChange prop', () => {
        render(<RoundCheckbox />);
        const checkboxContainer = screen.getByRole('checkbox').parentElement;

        // Should not throw error when clicking without onChange prop
        expect(() => {
        fireEvent.click(checkboxContainer);
        }).not.toThrow();
    });

    test('maintains state through multiple interactions', () => {
        render(<RoundCheckbox onChange={mockOnChange} />);
        const checkboxContainer = screen.getByRole('checkbox').parentElement;

        // Click sequence
        fireEvent.click(checkboxContainer); // check
        expect(mockOnChange).toHaveBeenCalledWith(true);
        
        fireEvent.mouseEnter(checkboxContainer);
        expect(checkboxContainer).toHaveStyle({ opacity: 0.9 });
        
        fireEvent.mouseDown(checkboxContainer);
        expect(checkboxContainer).toHaveStyle({ opacity: 0.8 });
        
        fireEvent.mouseUp(checkboxContainer);
        fireEvent.mouseLeave(checkboxContainer);
        expect(checkboxContainer).toHaveStyle({ opacity: 1 });
        
        fireEvent.click(checkboxContainer); // uncheck
        expect(mockOnChange).toHaveBeenCalledWith(false);
    });
    });