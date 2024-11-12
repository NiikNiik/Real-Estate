import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../../components/Checkbox';
import colors from '../../config/colors';

// Mock the styles
jest.mock('../../config/styles', () => ({
    checkboxContainer: {
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

    describe('Checkbox Component Unit Tests', () => {
    const defaultProps = {
        onChange: jest.fn(),
        isChecked: false
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders unchecked by default', () => {
        render(<Checkbox />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
    });

    it('renders checked when isChecked prop is true', () => {
        render(<Checkbox isChecked={true} />);
        const checkbox = screen.getByRole('checkbox');
        expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('calls onChange handler when clicked', () => {
        const onChange = jest.fn();
        render(<Checkbox onChange={onChange} />);
        
        const container = screen.getByRole('checkbox').closest('div');
        fireEvent.click(container);
        
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('toggles check state when clicked', () => {
        render(<Checkbox {...defaultProps} />);
        const container = screen.getByRole('checkbox').closest('div');
        
        // Initial state - no checkmark
        expect(screen.queryByText('✓')).not.toBeVisible();
        
        // After click - checkmark appears
        fireEvent.click(container);
        expect(screen.queryByText('✓')).toBeVisible();
    });

    it('changes opacity on hover and active states', () => {
        render(<Checkbox {...defaultProps} />);
        const container = screen.getByRole('checkbox').closest('div');
        
        // Initial state
        expect(container).toHaveStyle({ opacity: 1 });
        
        // Hover state
        fireEvent.mouseEnter(container);
        expect(container).toHaveStyle({ opacity: 0.9 });
        
        // Active state
        fireEvent.mouseDown(container);
        expect(container).toHaveStyle({ opacity: 0.8 });
        
        // Release
        fireEvent.mouseUp(container);
        fireEvent.mouseLeave(container);
        expect(container).toHaveStyle({ opacity: 1 });
    });

    it('applies correct styles based on checked state', () => {
        const { rerender } = render(<Checkbox {...defaultProps} />);
        const container = screen.getByRole('checkbox').closest('div');
        
        // Unchecked state
        expect(container).toHaveStyle({
        backgroundColor: 'transparent',
        color: colors.primary,
        border: `2px solid ${colors.primary}`
        });
        
        // Checked state
        rerender(<Checkbox {...defaultProps} isChecked={true} />);
        expect(container).toHaveStyle({
        backgroundColor: colors.primary,
        color: colors.white,
        border: `2px solid ${colors.primary}`
        });
    });

    it('applies custom styles without overriding core styles', () => {
        const customStyle = {
        margin: '10px',
        padding: '5px'
        };
        
        render(<Checkbox {...defaultProps} style={customStyle} />);
        const container = screen.getByRole('checkbox').closest('div');
        
        expect(container).toHaveStyle({
        margin: '10px',
        padding: '5px',
        border: `2px solid ${colors.primary}`,
        backgroundColor: 'transparent'
        });
    });

    it('updates when isChecked prop changes', () => {
        const { rerender } = render(<Checkbox {...defaultProps} />);
        
        // Initial state
        expect(screen.queryByText('✓')).not.toBeVisible();
        
        // Update props
        rerender(<Checkbox {...defaultProps} isChecked={true} />);
        expect(screen.queryByText('✓')).toBeVisible();
    });
});