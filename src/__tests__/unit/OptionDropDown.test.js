import { render, screen, fireEvent } from '@testing-library/react';
import OptionDropDown from '../../components/OptionDropDown';

// Mock child components
jest.mock('../../components/Button', () => {
    return function MockButton({ label, onClick }) {
        return <button data-testid="mock-button" onClick={onClick}>{label}</button>;
    };
    });

    jest.mock('../../components/Checkbox', () => {
    return function MockCheckbox({ isChecked, onChange, children }) {
        return (
        <input
            type="checkbox"
            data-testid="mock-checkbox"
            checked={isChecked}
            onChange={(e) => onChange(e.target.checked)}
        />
        );
    };
    });

    jest.mock('../../components/TextButton', () => {
    return function MockTextButton({ children, onClick }) {
        return <button data-testid="mock-text-button" onClick={onClick}>{children}</button>;
    };
    });

    jest.mock('../../assets/DownChevron', () => {
    return function MockDownChevron() {
        return <div data-testid="down-chevron">▼</div>;
    };
    });

    jest.mock('../../assets/UpChevron', () => {
    return function MockUpChevron() {
        return <div data-testid="up-chevron">▲</div>;
    };
    });

    describe('OptionDropDown Component', () => {
    const defaultProps = {
        text: 'Test Dropdown',
        items: [],
        itemList: ['Item 1', 'Item 2', 'Item 3'],
        isOpen: false,
        toggleDropdown: jest.fn(),
        shouldUpdateText: false,
        exactMatch: false,
        onExactMatchChange: jest.fn(),
        onSelect: jest.fn(),
        isHomeType: false
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders closed dropdown button', () => {
        render(<OptionDropDown {...defaultProps} />);
        expect(screen.getByText('Test Dropdown')).toBeInTheDocument();
        expect(screen.getByTestId('down-chevron')).toBeInTheDocument();
    });

    test('shows dropdown content when isOpen is true', () => {
        render(<OptionDropDown {...defaultProps} isOpen={true} />);
        defaultProps.itemList.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    test('handles "For Sale" dropdown selection', () => {
        render(
        <OptionDropDown
            {...defaultProps}
            text="For Sale"
            isOpen={true}
            itemList={['For Sale', 'For Rent']}
        />
        );
        
        // Get all elements with "For Sale" text and click the one in the dropdown (second occurrence)
        const forSaleItems = screen.getAllByText('For Sale');
        fireEvent.click(forSaleItems[1].closest('div'));
        expect(defaultProps.onSelect).toHaveBeenCalledWith('For Sale');
    });

    test('handles home type selection with checkboxes', () => {
        render(
        <OptionDropDown
            {...defaultProps}
            isOpen={true}
            isHomeType={true}
            itemList={['Home Type', 'House', 'Apartment', 'Select All']}
        />
        );
        
        const checkboxes = screen.getAllByTestId('mock-checkbox');
        fireEvent.click(checkboxes[0]);
        expect(defaultProps.onSelect).toHaveBeenCalled();
    });

    test('toggles dropdown when button is clicked', () => {
        render(<OptionDropDown {...defaultProps} />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(defaultProps.toggleDropdown).toHaveBeenCalled();
    });

    test('shows Apply button for home type selection', () => {
        render(
        <OptionDropDown
            {...defaultProps}
            isOpen={true}
            isHomeType={true}
        />
        );
        
        expect(screen.getByTestId('mock-button')).toBeInTheDocument();
        expect(screen.getByText('Apply')).toBeInTheDocument();
    });

    test('changes chevron direction based on dropdown state', () => {
        const { rerender } = render(<OptionDropDown {...defaultProps} />);
        expect(screen.getByTestId('down-chevron')).toBeInTheDocument();

        rerender(<OptionDropDown {...defaultProps} isOpen={true} />);
        expect(screen.getByTestId('up-chevron')).toBeInTheDocument();
    });

    test('updates text when shouldUpdateText is true', () => {
        render(
        <OptionDropDown
            {...defaultProps}
            isOpen={true}
            shouldUpdateText={true}
            itemList={['Option 1', 'Option 2']}
        />
        );
        
        const option = screen.getByText('Option 1');
        fireEvent.click(option);
        expect(defaultProps.onSelect).toHaveBeenCalledWith('Option 1');
    });

    test('renders exact match checkbox when present', () => {
        render(
        <OptionDropDown
            {...defaultProps}
            isOpen={true}
            itemList={['Use exact match']}
        />
        );
        
        expect(screen.getByTestId('mock-checkbox')).toBeInTheDocument();
    });
});