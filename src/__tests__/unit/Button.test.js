import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button Component Unit Tests', () => {
    const defaultProps = {
        label: 'Click Me',
        backgroundColor: '#ff0000',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold'
    };

    it('renders button with correct label', () => {
        render(<Button {...defaultProps} />);
        expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
    });

    it('applies custom styles correctly', () => {
        render(<Button {...defaultProps} />);
        const button = screen.getByRole('button');

        expect(button).toHaveStyle({
        backgroundColor: '#ff0000',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        opacity: 1 // Default state
        });
    });

    it('changes opacity on hover', () => {
        render(<Button {...defaultProps} />);
        const button = screen.getByRole('button');
        
        // Initial state
        expect(button).toHaveStyle({ opacity: 1 });
        
        // Hover state
        fireEvent.mouseEnter(button);
        expect(button).toHaveStyle({ opacity: 0.9 });
        
        // Return to initial state
        fireEvent.mouseLeave(button);
        expect(button).toHaveStyle({ opacity: 1 });
    });

    it('changes opacity on active (mousedown)', () => {
        render(<Button {...defaultProps} />);
        const button = screen.getByRole('button');
        
        // Initial state
        expect(button).toHaveStyle({ opacity: 1 });
        
        // Active state
        fireEvent.mouseDown(button);
        expect(button).toHaveStyle({ opacity: 0.8 });
        
        // Return to initial state
        fireEvent.mouseUp(button);
        expect(button).toHaveStyle({ opacity: 1 });
    });

    it('handles hover and active states in combination', () => {
        render(<Button {...defaultProps} />);
        const button = screen.getByRole('button');
        
        // Hover then active
        fireEvent.mouseEnter(button);
        expect(button).toHaveStyle({ opacity: 0.9 });
        
        fireEvent.mouseDown(button);
        expect(button).toHaveStyle({ opacity: 0.8 });
        
        // Release but keep hovering
        fireEvent.mouseUp(button);
        expect(button).toHaveStyle({ opacity: 0.9 });
        
        // Leave button
        fireEvent.mouseLeave(button);
        expect(button).toHaveStyle({ opacity: 1 });
    });

    it('applies additional custom styles without overriding core styles', () => {
        const customStyle = {
        padding: '20px',
        margin: '10px',
        borderRadius: '8px'
        };
        
        render(<Button {...defaultProps} style={customStyle} />);
        const button = screen.getByRole('button');
        
        // Check that both custom and core styles are applied
        expect(button).toHaveStyle({
        ...customStyle,
        backgroundColor: defaultProps.backgroundColor,
        color: defaultProps.color,
        fontSize: defaultProps.fontSize,
        fontWeight: defaultProps.fontWeight,
        opacity: 1
        });
    });

    it('renders without optional props', () => {
        render(<Button label="Basic Button" />);
        const button = screen.getByRole('button', { name: 'Basic Button' });
        
        expect(button).toBeInTheDocument();
        // Should not throw errors when optional styles are not provided
    });
});