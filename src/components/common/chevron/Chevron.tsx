import './Chevron.css';

const Chevron = ({position = 'right', handleChevronClick}: {position?: string, handleChevronClick: (e: React.MouseEvent<HTMLElement>) => void}) => {
  return (
    <span className="chevron-container" onClick={handleChevronClick}>
      <span className={`chevron ${position}`}></span>
    </span>
  );
}

export default Chevron;
