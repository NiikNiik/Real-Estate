import { render, screen } from '@testing-library/react';
import BackArrowIcon from '../../components/BackArrowIcon';

describe('BackArrowIcon Component Unit Tests', () => {
    it('renders without crashing', () => {
        render(<BackArrowIcon />);
        expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    });

    it('applies custom styles correctly', () => {
        const customStyle = {
        width: '32px',
        height: '32px',
        fill: 'red'
        };
        
        render(<BackArrowIcon style={customStyle} />);
        const icon = screen.getByRole('img', { hidden: true });
        
        expect(icon).toHaveStyle({
        width: '32px',
        height: '32px',
        fill: 'red'
        });
    });

    it('renders with correct viewBox attribute', () => {
        render(<BackArrowIcon />);
        const icon = screen.getByRole('img', { hidden: true });
        
        expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('renders with correct path', () => {
        render(<BackArrowIcon />);
        const icon = screen.getByRole('img', { hidden: true });
        
        expect(icon).toHaveAttribute('role', 'img');
        expect(icon.querySelector('path')).toHaveAttribute(
        'd',
        'M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z'
        );
    });
});