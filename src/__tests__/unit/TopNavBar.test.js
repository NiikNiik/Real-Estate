import { render, screen, fireEvent } from '@testing-library/react';
import TopNavBar from '../../components/TopNavBar';

// Mock all child components
jest.mock('../../components/TextButton', () => {
    return function MockTextButton({ children, onClick }) {
        return (
        <button data-testid="mock-text-button" onClick={onClick}>
            {children}
        </button>
        );
    };
    });

    jest.mock('../../components/TextInput', () => {
    return function MockTextInput({ placeholder }) {
        return <input data-testid="mock-text-input" placeholder={placeholder} />;
    };
    });

    jest.mock('../../components/OptionDropDown', () => {
    return function MockOptionDropDown({ text, isOpen, toggleDropdown, onSelect }) {
        return (
        <div data-testid={`option-dropdown-${text.toLowerCase().replace(/\s+/g, '-')}`}>
            <button onClick={toggleDropdown}>{text}</button>
            {isOpen && <div data-testid="dropdown-content">Content</div>}
            {onSelect && (
            <button onClick={() => onSelect('test-value')}>Select Option</button>
            )}
        </div>
        );
    };
    });

    jest.mock('../../components/Selector', () => {
    return function MockSelector({ texts, onSelect }) {
        return (
        <select data-testid="mock-selector" onChange={(e) => onSelect(e.target.value)}>
            {texts.map((text, index) => (
            <option key={index} value={text}>{text}</option>
            ))}
        </select>
        );
    };
    });

    // Mock assets
    jest.mock('../../assets/Icon', () => () => <div data-testid="mock-icon" />);
    jest.mock('../../assets/MagnifyingGlassIcon', () => () => <div data-testid="mock-magnifying-glass" />);

    describe('TopNavBar Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders logo and brand name', () => {
        render(<TopNavBar navigate={mockNavigate} />);
        expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
        expect(screen.getByText('GoCasa')).toBeInTheDocument();
    });

    test('renders search input', () => {
        render(<TopNavBar navigate={mockNavigate} />);
        expect(screen.getByTestId('mock-text-input')).toHaveAttribute(
        'placeholder',
        'Address, neighborhood, city, ZIP'
        );
    });

    test('renders all option dropdowns', () => {
        render(<TopNavBar navigate={mockNavigate} />);
        expect(screen.getByTestId('option-dropdown-for-sale')).toBeInTheDocument();
        expect(screen.getByTestId('option-dropdown-price')).toBeInTheDocument();
        expect(screen.getByTestId('option-dropdown-beds-&-baths')).toBeInTheDocument();
        expect(screen.getByTestId('option-dropdown-home-type')).toBeInTheDocument();
        expect(screen.getByTestId('option-dropdown-more')).toBeInTheDocument();
    });

    test('renders navigation links', () => {
        render(<TopNavBar navigate={mockNavigate} />);
        expect(screen.getByText('Manage Properties')).toBeInTheDocument();
        expect(screen.getByText('Advertise')).toBeInTheDocument();
        expect(screen.getByText('Log In')).toBeInTheDocument();
    });

    test('handles login navigation', () => {
        render(<TopNavBar navigate={mockNavigate} />);
        fireEvent.click(screen.getByText('Log In'));
        expect(mockNavigate).toHaveBeenCalledWith('login');
    });

    test('handles home navigation through logo', () => {
        render(<TopNavBar navigate={mockNavigate} />);
        const logoButton = screen.getByText('GoCasa').closest('button');
        fireEvent.click(logoButton);
        expect(mockNavigate).toHaveBeenCalledWith('home');
    });

    test('toggles dropdowns correctly', () => {
        render(<TopNavBar navigate={mockNavigate} />);
        
        // Click "For Sale" dropdown
        const forSaleDropdown = screen.getByTestId('option-dropdown-for-sale');
        fireEvent.click(forSaleDropdown.querySelector('button'));
        
        // Verify only one dropdown is open at a time
        const dropdownContents = screen.getAllByTestId('dropdown-content');
        expect(dropdownContents).toHaveLength(1);
    });

    test('updates For Sale selection', () => {
        render(<TopNavBar navigate={mockNavigate} />);
        const consoleSpy = jest.spyOn(console, 'log');
        
        const forSaleDropdown = screen.getByTestId('option-dropdown-for-sale');
        const selectButton = forSaleDropdown.querySelector('button:last-child');
        fireEvent.click(selectButton);
        
        expect(consoleSpy).toHaveBeenCalledWith('For Sale selection changed to:', 'test-value');
        consoleSpy.mockRestore();
    });

    test('maintains header layout styles', () => {
        const { container } = render(<TopNavBar navigate={mockNavigate} />);
        const header = container.firstChild;
        
        expect(header).toHaveStyle({
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '75px',
        zIndex: 1000
        });
    });

    test('updates home type items based on For Sale selection', () => {
        render(<TopNavBar navigate={mockNavigate} />);
        
        const forSaleDropdown = screen.getByTestId('option-dropdown-for-sale');
        const selectButton = forSaleDropdown.querySelector('button:last-child');
        fireEvent.click(selectButton);
        
        // Home type dropdown should update its items
        const homeTypeDropdown = screen.getByTestId('option-dropdown-home-type');
        expect(homeTypeDropdown).toBeInTheDocument();
    });
});