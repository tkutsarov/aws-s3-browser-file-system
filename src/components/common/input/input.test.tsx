import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom';

import Input from './Input';

describe('Input test suite', () => {
  test('renders with default props', () => {
    const { getByRole } = render(<Input name="test-input" value="input value" onChange={() => {}} />);

    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('input');
    expect(input.getAttribute('name')).toBe('test-input');
    expect(input.getAttribute('value')).toBe('input value');
  });

  test('renders with default props', () => {
    const handleValueChange = jest.fn();

    const { getByRole } = render(<Input name="test-input" value="input value" onChange={(e) => handleValueChange(e.target.value)} />);

    const input = getByRole('textbox');

    fireEvent.change(input, {target: {value: 'new value'}});
    
    expect(handleValueChange).toHaveBeenCalledWith('new value');
  });
});
