import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../../redux/store";
import Chevron from "../../../common/chevron/Chevron";
import DirMenu from "./DirMenu";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuElement = ({itemKey, hasSubmenu, handleDirClick, path, data}: {itemKey: string, hasSubmenu: boolean, handleDirClick: (dirPath: string) => void, path: string, data: any}) => {
  const [chevronPosition, setChevronPosition] = useState('right');

  const activeDirPath = useSelector((state: RootState) => state.activeDirectoryPath);

  const handleChevronClick = () => {
    setChevronPosition(chevronPosition === 'right' ? 'bottom' : 'right');
  }

  return (
    <li 
      className={`${hasSubmenu ? 'has-subdirs' : 'no-subdirs'} ${activeDirPath === path ? 'active' : ''} ${chevronPosition === 'right' ? 'hidden' : 'open'}`}
    >
      <div className="dir-container">
        {hasSubmenu ? <Chevron position={chevronPosition} handleChevronClick={handleChevronClick} /> : ''}
        <div onClick={() => handleDirClick(path)}> {itemKey}</div>
      </div>
      {hasSubmenu && <DirMenu data={data[itemKey]} dirPath={path} handleDirClick={handleDirClick} />}
    </li>
  );
}

export default MenuElement;
