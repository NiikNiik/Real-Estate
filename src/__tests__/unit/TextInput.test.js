import { render, screen, fireEvent } from '@testing-library/react';
import AppTextInput from '../../components/TextInput';
import colors from '../../config/colors';

// Mock styles
jest.mock('../../config/styles', () => ({
    InputContainer: {
        width: '100%',
        position: 'relative',
    },
    textInput: {
        boxSizing: 'border-box',
        width: '100%',
        padding: '8px',
    }
    }));

    describe('AppTextInput Component', () => {
    const defaultProps = {
        placeholder: 'Enter text',
    };

    test('renders with default props', () => {
        render(<AppTextInput {...defaultProps} />);
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toBeInTheDocument();
    });

    test('applies custom width', () => {
        render(<AppTextInput {...defaultProps} width="200px" />);
        const container = screen.getByPlaceholderText('Enter text').parentElement;
        expect(container).toHaveStyle({ width: '200px' });
    });

    test('applies custom styles', () => {
        const customStyle = {
        backgroundColor: 'red',
        color: 'white',
        };
        
        render(<AppTextInput {...defaultProps} style={customStyle} />);
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toHaveStyle(customStyle);
    });

    test('changes border color on hover', () => {
        render(<AppTextInput {...defaultProps} />);
        const input = screen.getByPlaceholderText('Enter text');
        
        // Initial state
        expect(input).toHaveStyle({ border: '1px solid #ccc' });
        
        // Hover state
        fireEvent.mouseEnter(input.parentElement);
        expect(input).toHaveStyle({ border: `1px solid ${colors.primary}` });
        
        // Exit hover
        fireEvent.mouseLeave(input.parentElement);
        expect(input).toHaveStyle({ border: '1px solid #ccc' });
    });

    test('changes border color on focus', () => {
        render(<AppTextInput {...defaultProps} />);
        const input = screen.getByPlaceholderText('Enter text');
        
        // Initial state
        expect(input).toHaveStyle({ border: '1px solid #ccc' });
        
        // Focus state
        fireEvent.focus(input);
        expect(input).toHaveStyle({ border: `1px solid ${colors.primary}` });
        
        // Blur state
        fireEvent.blur(input);
        expect(input).toHaveStyle({ border: '1px solid #ccc' });
    });

    test('maintains focus border color while also hovered', () => {
        render(<AppTextInput {...defaultProps} />);
        const input = screen.getByPlaceholderText('Enter text');
        
        // Focus and hover
        fireEvent.focus(input);
        fireEvent.mouseEnter(input.parentElement);
        expect(input).toHaveStyle({ border: `1px solid ${colors.primary}` });
        
        // Keep hover, remove focus
        fireEvent.blur(input);
        expect(input).toHaveStyle({ border: `1px solid ${colors.primary}` });
        
        // Remove hover
        fireEvent.mouseLeave(input.parentElement);
        expect(input).toHaveStyle({ border: '1px solid #ccc' });
    });

    test('handles text input', () => {
        const onChangeMock = jest.fn();
        render(<AppTextInput {...defaultProps} onChange={onChangeMock} />);
        const input = screen.getByPlaceholderText('Enter text');
        
        fireEvent.change(input, { target: { value: 'test input' } });
        expect(onChangeMock).toHaveBeenCalled();
        expect(input.value).toBe('test input');
    });

    test('passes through other props', () => {
        render(
        <AppTextInput
            {...defaultProps}
            data-testid="test-input"
            maxLength={10}
            required
        />
        );
        
        const input = screen.getByTestId('test-input');
        expect(input).toHaveAttribute('maxLength', '10');
        expect(input).toHaveAttribute('required');
    });

    test('maintains outline: none in all states', () => {
        render(<AppTextInput {...defaultProps} />);
        const input = screen.getByPlaceholderText('Enter text');
        
        // Check all states
        expect(input).toHaveStyle({ outline: 'none' });
        
        fireEvent.focus(input);
        expect(input).toHaveStyle({ outline: 'none' });
        
        fireEvent.mouseEnter(input.parentElement);
        expect(input).toHaveStyle({ outline: 'none' });
        
        fireEvent.mouseLeave(input.parentElement);
        fireEvent.blur(input);
        expect(input).toHaveStyle({ outline: 'none' });
    });
});