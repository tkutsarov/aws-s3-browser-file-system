import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import AWS from 'aws-sdk';

import { RootState } from "../../../redux/store";
import { addObject } from "../../../redux/bucketObjects/bucketObjectsSlice";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import Modal from "../../common/modal/Modal";

import dummyFile from '../../../assets/__keep_dir__.txt';

const AddDirectory = () => {
  const [dirName, setDirName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {accessKey, secretAccessKey, bucketName, region} = useSelector((state: RootState) => state.config);
  const activeDirectoryPath = useSelector((state: RootState) => state.activeDirectoryPath);

  const dispatch = useDispatch();

  useEffect(() => {
    AWS.config.update({
      accessKeyId: accessKey,
      secretAccessKey: secretAccessKey,
      region: region
    });
  }, [accessKey, secretAccessKey, bucketName, region]);

  const handleDirNameChange = (dirName: string) => {
    setDirName(dirName);
  }

  const createDirectory = useCallback(async (directoryName: string) => {
    if (directoryName) {
      try {
        const params = {
          Bucket: bucketName,
          Key: activeDirectoryPath ? `${activeDirectoryPath}/${directoryName}/__keep_dir__.txt` : `${directoryName}/__keep_dir__.txt`,
          Body: dummyFile
        };

        const s3 = new AWS.S3();
        
        const data = await s3.upload(params).promise();
        
        const lastModifiedDate = new Date();

        dispatch(addObject({key: data.Key, size: 28, lastModified: lastModifiedDate.toDateString() }));
        
        toast.success('File uploaded successfully ');
      } catch (error) {
        toast.error(`Error uploading file: ${error}`);
      }
    } else {
      toast.error('File incorrectly uploaded')
    }
  }, [bucketName, activeDirectoryPath, dispatch]);

  return (
    <div>
      <Input name="create-directory" value={dirName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDirNameChange(e.target.value)} />
      <Button name='Add directory' onClick={() => setIsModalOpen(true) } />
      {
        isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            text={`Do yu want to create directory ${dirName} in path: ${activeDirectoryPath}`}
            closeModal={() => setIsModalOpen(false)}
            onClickActionButton={() => createDirectory(dirName)}
            actionButtonText='Confirm'
          />
        )
      }
    </div>
  )
}

export default AddDirectory;
