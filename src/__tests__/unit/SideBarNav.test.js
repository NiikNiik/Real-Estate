import { render, screen, fireEvent, act } from '@testing-library/react';
import SideNavBar from '../../components/SideNavBar';

// Mock MenuItem component
jest.mock('../../components/MenuItem', () => {
    return function MockMenuItem({ 
        text, 
        onClick, 
        onMouseEnter, 
        onMouseLeave,
        onHoverChange,
        style, 
        subMenuItems = [],
        externalHoverState = false  // Add this prop
    }) {
        return (
        <div 
            onClick={() => onClick(text)}
            onMouseEnter={() => {
            onMouseEnter?.();
            onHoverChange?.(true);
            }}
            onMouseLeave={() => {
            onMouseLeave?.();
            onHoverChange?.(false);
            }}
            style={style}
            data-testid={`menu-${text.toLowerCase().replace(/\s+/g, '-')}`}
        >
            {text}
            {externalHoverState && subMenuItems.map((item, index) => (
            <div key={index} data-testid={`submenu-${item.toLowerCase().replace(/\s+/g, '-')}`}>
                {item}
            </div>
            ))}
        </div>
        );
    };
    });

    describe('SideNavBar', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks();
    });

    // ... other tests remain the same ...

    test('hides submenu when mouse leaves', async () => {
        const { container } = render(<SideNavBar />);
        
        // Get the main navigation container
        const mainNav = container.querySelector('[style*="width: 10vw"]');
        const buyHomesMenu = screen.getByTestId('menu-buy-homes');
        
        // Show submenu
        await act(async () => {
        fireEvent.mouseEnter(buyHomesMenu);
        jest.advanceTimersByTime(200);
        });
        
        // Verify submenu is shown
        expect(screen.queryByTestId('submenu-new-homes')).toBeTruthy();
        
        // Hide submenu by leaving the main navigation
        await act(async () => {
        fireEvent.mouseLeave(mainNav);
        jest.advanceTimersByTime(200);
        });
        
        await act(async () => {
        // Make sure we've processed all state updates
        await Promise.resolve();
        jest.runAllTimers();
        });
        
        // Now verify the submenu is hidden
        expect(screen.queryByTestId('submenu-new-homes')).not.toBeInTheDocument();
    });
});