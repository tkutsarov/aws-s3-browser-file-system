import { ButtonSizeEnum } from '../../../types/ButtonSizeEnum';
import { ButtonStyleEnum } from '../../../types/ButtonStyleEnum';

import './Button.css';

interface IProps {
  name: string;
  onClick: () => void;
  styleType?: ButtonStyleEnum;
  size? : ButtonSizeEnum;
}

const Button = ({name, onClick, styleType = ButtonStyleEnum.Success, size = ButtonSizeEnum.Regular }: IProps) => {
  return (
    <button className={`btn ${styleType} ${size}`} onClick={onClick}>{name}</button>
  );
}

export default Button;
