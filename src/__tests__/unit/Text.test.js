import React from 'react';
import { render, screen } from '@testing-library/react';
import AppText from '../../components/Text';
import styles from '../../config/styles';

describe('AppText', () => {
    test('renders the correct text', () => {
        const testText = 'Hello, World!';
        render(<AppText>{testText}</AppText>);
        const textElement = screen.getByText(testText);
        expect(textElement).toBeInTheDocument();
    });

    test('applies the default text styles', () => {
        render(<AppText>Test Text</AppText>);
        const textElement = screen.getByText('Test Text');
        expect(textElement).toHaveStyle({
        ...styles.text,
        });
    });

    test('applies custom styles', () => {
        const customStyles = {
        color: 'red',
        fontSize: '24px',
        };
        render(<AppText style={customStyles}>Custom Text</AppText>);
        const textElement = screen.getByText('Custom Text');
        expect(textElement).toHaveStyle({
        ...styles.text,
        ...customStyles,
        });
    });

    test('forwards additional props', () => {
        const handleClick = jest.fn();
        render(<AppText onClick={handleClick}>Clickable Text</AppText>);
        const textElement = screen.getByText('Clickable Text');
        textElement.click();
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});