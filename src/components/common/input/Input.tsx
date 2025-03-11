import './Input.css';

interface IProps {
  name: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({name, className, value, onChange}: IProps) => {
  let classNames = 'input';

  if (className) {
    classNames += ` className`;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <input name={name} className={classNames} type="text" value={value} onChange={handleChange} />
  );
}

export default Input;
