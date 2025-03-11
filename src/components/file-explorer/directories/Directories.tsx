import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from '../../../redux/store';
import { updateActiveDirectoryPath } from "../../../redux/activeDirectoryPath/activeDirectoryPathSlice";
import DirMenu from "./dir-menu/DirMenu";
import Chevron from "../../common/chevron/Chevron";

import './Directories.css';
import AddDirectory from "./AddDirectory";

const Directories = () => {
  const [chevronPosition, setChevronPosition] = useState('right');

  const dispatch = useDispatch();

  const {dirStructure} = useSelector((state: RootState) => state.bucketObjects);
  const activeDirectoryPath = useSelector((state: RootState) => state.activeDirectoryPath);

  const handleDirClick = (dirPath: string) => {
    dispatch(updateActiveDirectoryPath(dirPath));
  }

  const handleChevronClick = () => {
    setChevronPosition(chevronPosition === 'right' ? 'bottom' : 'right');
  }

  return (
    <div>
      <AddDirectory />
      <ul>
        <li className={`${activeDirectoryPath === '' ? 'active' : ''} ${chevronPosition === 'right' ? 'hidden' : 'open'}`}>
          <div className="dir-container">
            <Chevron position={chevronPosition} handleChevronClick={handleChevronClick} />
            <div onClick={() => handleDirClick('')}> main</div>
          </div>
          <DirMenu data={dirStructure} dirPath='' handleDirClick={handleDirClick} />
        </li>
      </ul>
    </div>
  );
}

export default Directories;
