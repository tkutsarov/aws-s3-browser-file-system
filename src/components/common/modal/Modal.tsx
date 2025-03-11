import { ButtonStyleEnum } from '../../../types/ButtonStyleEnum';
import Button from '../button/Button';

import './Modal.css';

interface IProps {
  isOpen: boolean;
  text: string;
  closeModal: () => void;
  heading?: string;
  widthSize?: string;
  onClickActionButton?: () => void;
  actionButtonText?: string
}

const Modal = ({isOpen = false, heading, text, widthSize = '300px', closeModal, onClickActionButton, actionButtonText}: IProps) => {
  const handleActionButtonClick = () => {
    if (onClickActionButton) {
      onClickActionButton();
    } 
    
    closeModal();
  }

  if (isOpen) {
    return (
      <>
        <div className="modal-backdrop" />
        <div className='modal' style={{width: widthSize}}>
          {
            heading && (
              <h4>{heading}</h4>
            )
          }
          <p>{text}</p>
          <div className='modal-buttons'>
            {
              onClickActionButton && (
                <Button name={`${actionButtonText || 'Confirm'}`} styleType={ButtonStyleEnum.Success} onClick={handleActionButtonClick} />
              )
            }
            <Button name="Close" styleType={ButtonStyleEnum.Message} onClick={closeModal} />
          </div>
        </div>
      </>
    );
  }
  
  return null;
}

export default Modal;
