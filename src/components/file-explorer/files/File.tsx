import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AWS from 'aws-sdk';

import { RootState } from '../../../redux/store';
import Modal from '../../common/modal/Modal';

const File = ({fileName}: {fileName: string}) => {
  const [modalState, setModalState] = useState({isOpen: false, heading: '', text: ''});

  const {accessKey, secretAccessKey, bucketName, region} = useSelector((state: RootState) => state.config);

  const activeDirectoryPath = useSelector((state: RootState) => state.activeDirectoryPath);

  useEffect(() => {
    AWS.config.update({
      accessKeyId: accessKey,
      secretAccessKey: secretAccessKey,
      region: region
    });
  }, [accessKey, secretAccessKey, bucketName, region]);

  const getObjectByKey = useCallback((fileName: string) => {
    const params = {
      Bucket: bucketName,
      Key: activeDirectoryPath ? `${activeDirectoryPath}/${fileName}` : fileName
    };

    const s3 = new AWS.S3();

    s3.getObject(params, function(err, data) {
      if (err) {
        toast.error('Error fetching the object');
      } else {
        setModalState({heading: `File: ${activeDirectoryPath}/${fileName}`, text: data?.Body?.toString() || 'Text file has no content', isOpen: true});

        toast.success("success getting file from S3");
      }
    });
  }, [bucketName, activeDirectoryPath]);

  return (
    <div className="file-name">
      <span onClick={() => {getObjectByKey(fileName)}}>{fileName}</span>
      {
        modalState.isOpen && (
          <Modal
            isOpen={modalState.isOpen}
            widthSize='90vw'
            heading={modalState.heading}
            text={modalState.text}
            closeModal={() => setModalState({isOpen: false, heading: '', text: ''})}
          />
        )
      }
    </div>
  )
}

export default File;
