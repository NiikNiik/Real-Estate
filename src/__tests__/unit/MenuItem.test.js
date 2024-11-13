import { render, screen, fireEvent } from '@testing-library/react';
import MenuItem from '../../components/MenuItem';
import colors from '../../config/colors';

// Mock TextButton component
jest.mock('../../components/TextButton', () => {
    return function MockTextButton({ children }) {
        return <div data-testid="text-button">{children}</div>;
    };
    });

    describe('MenuItem Component', () => {
    const defaultProps = {
        text: 'Menu Item',
        subMenuItems: ['Submenu 1', 'Submenu 2', 'Submenu 3']
    };

    it('renders main menu item text', () => {
        render(<MenuItem {...defaultProps} />);
        expect(screen.getByText('Menu Item')).toBeInTheDocument();
    });

    it('does not show submenu by default', () => {
        render(<MenuItem {...defaultProps} />);
        defaultProps.subMenuItems.forEach(item => {
        expect(screen.queryByText(item)).not.toBeInTheDocument();
        });
    });

    it('shows submenu on hover', () => {
        render(<MenuItem {...defaultProps} />);
        const menuItem = screen.getByTestId('text-button').parentElement;
        
        // Trigger hover
        fireEvent.mouseEnter(menuItem);

        // Check if submenu items are visible
        defaultProps.subMenuItems.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    it('hides submenu when mouse leaves', () => {
        render(<MenuItem {...defaultProps} />);
        const menuItem = screen.getByTestId('text-button').parentElement;
        
        // Show submenu
        fireEvent.mouseEnter(menuItem);
        // Hide submenu
        fireEvent.mouseLeave(menuItem);

        // Verify submenu items are hidden
        defaultProps.subMenuItems.forEach(item => {
        expect(screen.queryByText(item)).not.toBeInTheDocument();
        });
    });

    it('renders correct number of submenu items when hovered', () => {
        render(<MenuItem {...defaultProps} />);
        const menuItem = screen.getByTestId('text-button').parentElement;
        
        // Show submenu
        fireEvent.mouseEnter(menuItem);
        
        const subMenuButtons = screen.getAllByTestId('text-button');
        // +1 because main menu item also uses TextButton
        expect(subMenuButtons).toHaveLength(defaultProps.subMenuItems.length + 1);
    });

    it('renders menu item with no submenu items', () => {
        render(<MenuItem text="Solo Item" subMenuItems={[]} />);
        
        // Hover shouldn't show any submenu
        const menuItem = screen.getByTestId('text-button').parentElement;
        fireEvent.mouseEnter(menuItem);
        
        // Only the main button should be present
        expect(screen.getAllByTestId('text-button')).toHaveLength(1);
    });

    it('maintains submenu visibility while hovered', () => {
        render(<MenuItem {...defaultProps} />);
        const menuItem = screen.getByTestId('text-button').parentElement;
        
        // Show submenu
        fireEvent.mouseEnter(menuItem);
        
        // Verify all submenu items are visible
        defaultProps.subMenuItems.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
        });
    });
});