import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom';

import Button from './Button';
import { ButtonStyleEnum } from '../../../types/ButtonStyleEnum';

describe('Button test suite', () => {
  test('renders with default style', () => {
    const { getByText, container } = render(<Button name="Btn name" onClick={ () => {} } />);

    expect(getByText('Btn name')).toBeInTheDocument();
    expect(container.getElementsByClassName('btn-success').length).toBe(1);
  });

  test('renders with given style', () => {
    const { container } = render(<Button name="Btn name" onClick={ () => {} } styleType={ButtonStyleEnum.Error} />);

    expect(container.getElementsByClassName('btn-error').length).toBe(1);
  });

  test('modal open state handlesr is connected to button', () => {
    const handleButtonClick = jest.fn();

    const { getByText } = render(<Button name="Btn name" onClick={ handleButtonClick } />);

    const button = getByText('Btn name');
    fireEvent.click(button);
  
    expect(handleButtonClick).toHaveBeenCalled();
  });
});
