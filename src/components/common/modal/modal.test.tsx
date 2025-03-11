import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';

import Modal from './Modal';

describe('Modal test suite', () => {
  test('renders with a heading and text', () => {
    const { getByText } = render(<Modal heading="Test heading" isOpen={true} text="Test text" closeModal={() => {}} />);

    expect(getByText('Test heading')).toBeInTheDocument();
    expect(getByText('Test text')).toBeInTheDocument()
  });

  test('renders a backdrop background ', () => {
    const { container } = render(<Modal heading="Test heading" isOpen={true} text="Test text" closeModal={() => {}} />);

    expect(container.getElementsByClassName('modal-backdrop').length).toBe(1);
  });

  test('isOpen is false', () => {
    const { container } = render(<Modal heading="Test heading" isOpen={false} text="Test text" closeModal={() => {}} />);

    expect(screen.queryByText('Test heading')).not.toBeInTheDocument();
    expect(container.getElementsByClassName('modal-backdrop').length).toBe(0);
  });

  test('modal open state handler is connected to button', () => {
    const handleClickActionButton = jest.fn();

    const { getByText } = render(
      <Modal 
        heading="Test heading"
        isOpen={true} text="Test text"
        closeModal={() => {}}
        onClickActionButton={handleClickActionButton}
        actionButtonText="Confirm"
      />
    );

    const button = getByText('Confirm');
    fireEvent.click(button);
  
    expect(handleClickActionButton).toHaveBeenCalled();
  });

  test('modal close handler', () => {
    const handleIsOpen = jest.fn();

    const { getByText } = render(
      <Modal 
        heading="Test heading"
        isOpen={true} text="Test text"
        closeModal={handleIsOpen}
      />
    );

    const button = getByText('Close');
    fireEvent.click(button);
  
    expect(handleIsOpen).toHaveBeenCalled();
  });
});
