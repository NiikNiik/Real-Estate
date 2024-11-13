import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TextButton from '../../components/TextButton';
import colors from '../../config/colors';

describe('TextButton', () => {
    test('renders the correct text', () => {
        const testText = 'Click me!';
        render(<TextButton>{testText}</TextButton>);
        const buttonText = screen.getByText(testText);
        expect(buttonText).toBeInTheDocument();
    });

    test('applies the default styles', () => {
        render(<TextButton>Default Button</TextButton>);
        const buttonElement = screen.getByText('Default Button');
        expect(buttonElement).toHaveStyle({
        display: 'flex',
        alignItems: 'center',
        opacity: 1,
        color: colors.black,
        fontWeight: 'normal',
        cursor: 'pointer',
        });
    });

    test('applies custom styles', () => {
        const customStyles = {
        fontSize: '18px',
        marginRight: '10px',
        };
        render(<TextButton style={customStyles}>Custom Button</TextButton>);
        const buttonElement = screen.getByText('Custom Button');
        expect(buttonElement).toHaveStyle({
        ...customStyles,
        display: 'flex',
        alignItems: 'center',
        opacity: 1,
        color: colors.black,
        fontWeight: 'normal',
        cursor: 'pointer',
        });
    });

    test('applies hover styles', () => {
        render(<TextButton>Hovered Button</TextButton>);
        const buttonElement = screen.getByText('Hovered Button');

        fireEvent.mouseEnter(buttonElement);
        expect(buttonElement).toHaveStyle({
        opacity: 0.9,
        color: colors.primary,
        fontWeight: 'bold',
        });

        fireEvent.mouseLeave(buttonElement);
        expect(buttonElement).toHaveStyle({
        opacity: 1,
        color: colors.black,
        fontWeight: 'normal',
        });
    });

    test('applies external hover state', () => {
        const onHoverChange = jest.fn();
        render(
            <TextButton
            externalHoverState={true}
            onHoverChange={onHoverChange}
            >
            Externally Hovered Button
            </TextButton>
        );
        const buttonElement = screen.getByText('Externally Hovered Button');
        
        expect(buttonElement).toHaveStyle({
            opacity: 0.9,
            color: colors.primary,
            fontWeight: 'bold',
        });
        
        expect(onHoverChange).toHaveBeenCalledWith(true);
        });

    test('forwards additional props', () => {
        const handleClick = jest.fn();
        render(<TextButton onClick={handleClick}>Clickable Button</TextButton>);
        const buttonElement = screen.getByText('Clickable Button');
        buttonElement.click();
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});