import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom';

import Chevron from './Chevron';
import { ChevronPositionEnum } from '../../../types/ChevronPositionEnum'; 

describe('Button test suite', () => {
  test('renders with default chevron position - right', () => {
    const { container } = render(<Chevron handleChevronClick={ () => {} } />);

    expect(container.getElementsByClassName('right').length).toBe(1);
  });

  test('renders with custom chevron position', () => {
    const { container } = render(<Chevron position={ ChevronPositionEnum.Bottom } handleChevronClick={ () => {} } />);

    expect(container.getElementsByClassName('bottom').length).toBe(1);
  });

  test('attaches the click handler', () => {
    const handleChevronClick = jest.fn();

    const { container } = render(<Chevron handleChevronClick={ handleChevronClick } />);

    const chevron = container.getElementsByClassName('chevron-container')[0];
    fireEvent.click(chevron);
  
    expect(handleChevronClick).toHaveBeenCalled();
  });
});
