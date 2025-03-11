import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import AWS from 'aws-sdk';

import { deleteObject } from "../../../redux/bucketObjects/bucketObjectsSlice";
import { RootState } from "../../../redux/store";
import Modal from "../../common/modal/Modal";
import Button from "../../common/button/Button";
import { ButtonSizeEnum } from "../../../types/ButtonSizeEnum";
import { ButtonStyleEnum } from "../../../types/ButtonStyleEnum";
import { updateActiveDirectoryPath } from "../../../redux/activeDirectoryPath/activeDirectoryPathSlice";

const DeleteFile = ({fileName}: {fileName: string}) => {
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

  const deleteObjectByKey = useCallback((fileName: string) => {
    const key = activeDirectoryPath ? `${activeDirectoryPath}/${fileName}` : fileName;

    const params = { 
      Bucket: bucketName,
      Key: key
    };

    const s3 = new AWS.S3();

    s3.deleteObject(params, function(err) {
      if (err) {
        toast.error('Error deleting the object');
      } else {
        let newActiveDirectoryPath = '';
        const activeDirectoryPathArr = activeDirectoryPath.split('/');

        if (activeDirectoryPathArr.length > 1) {
          activeDirectoryPathArr.pop()
          newActiveDirectoryPath = activeDirectoryPathArr.join();
        }

        dispatch(deleteObject({key}));
        dispatch(updateActiveDirectoryPath(newActiveDirectoryPath))
        toast.success('Object has been deleted');
      }
    });
  },[bucketName, dispatch, activeDirectoryPath]);

  const handleDeleteActionButtonModal = useCallback((fileName: string) => {
    deleteObjectByKey(fileName);
  }, [deleteObjectByKey]);

  return (
    <div className="delete-file">
      <Button name="del" onClick={() => {setIsModalOpen(true)}} size={ButtonSizeEnum.Small} styleType={ButtonStyleEnum.Error} />
      {
        isModalOpen && (
          <Modal
            isOpen={isModalOpen} text={`Are you sure that you want to delete the file ${fileName}`}
            closeModal={() => setIsModalOpen(false)}
            onClickActionButton={() => handleDeleteActionButtonModal(fileName)} 
          />
        )
      }
    </div>
  )
}

export default DeleteFile;
