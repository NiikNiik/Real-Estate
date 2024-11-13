import { render } from '@testing-library/react';
import Screen from '../../components/Screen';

// Mock styles
jest.mock('../../config/styles', () => ({
    Screen: {
        width: '100%',
        height: '100%',
        position: 'relative'
    }
    }));

    describe('Screen Component', () => {
    test('renders children correctly', () => {
        const { getByTestId } = render(
        <Screen>
            <div data-testid="test-child">Test Content</div>
        </Screen>
        );
        expect(getByTestId('test-child')).toBeInTheDocument();
    });

    test('applies styles correctly', () => {
        const { container } = render(<Screen>Content</Screen>);
        const screenElement = container.firstChild;
        
        // Check individual styles instead of all at once
        expect(screenElement).toHaveStyle('width: 100%');
        expect(screenElement).toHaveStyle('height: 100%');
        expect(screenElement).toHaveStyle('position: relative');
    });

    test('merges custom styles with default styles', () => {
        const customStyle = {
        backgroundColor: 'red',
        padding: '20px'
        };

        const { container } = render(
        <Screen style={customStyle}>Content</Screen>
        );
        const screenElement = container.firstChild;
        
        // Check each style individually
        expect(screenElement).toHaveStyle('backgroundColor: red');
        expect(screenElement).toHaveStyle('padding: 20px');
        expect(screenElement).toHaveStyle('width: 100%');
        expect(screenElement).toHaveStyle('height: 100%');
        expect(screenElement).toHaveStyle('position: relative');
    });

    test('renders multiple children', () => {
        const { getByTestId } = render(
        <Screen>
            <div data-testid="child-1">First Child</div>
            <div data-testid="child-2">Second Child</div>
            <div data-testid="child-3">Third Child</div>
        </Screen>
        );

        expect(getByTestId('child-1')).toBeInTheDocument();
        expect(getByTestId('child-2')).toBeInTheDocument();
        expect(getByTestId('child-3')).toBeInTheDocument();
    });

    test('renders with no children', () => {
        const { container } = render(<Screen />);
        const screenElement = container.firstChild;
        expect(screenElement).toBeInTheDocument();
        expect(screenElement.children).toHaveLength(0);
    });

    test('custom styles override default styles', () => {
        const customStyle = {
        width: '50%',
        backgroundColor: 'blue'
        };

        const { container } = render(
        <Screen style={customStyle}>Content</Screen>
        );
        const screenElement = container.firstChild;
        
        // Check each style individually
        expect(screenElement).toHaveStyle('width: 50%');
        expect(screenElement).toHaveStyle('backgroundColor: blue');
        expect(screenElement).toHaveStyle('height: 100%');
        expect(screenElement).toHaveStyle('position: relative');
    });
});