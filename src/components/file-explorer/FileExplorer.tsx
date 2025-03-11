import { Link } from 'react-router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import AWS from 'aws-sdk';

import { RootState } from '../../redux/store';
import { saveObjects } from '../../redux/bucketObjects/bucketObjectsSlice';
import Directories from './directories/Directories';
import Files from './files/Files';

import './FileExplorer.css';
import UploadFile from './files/UploadFile';

const FileExplorer = () => {
  const {accessKey, secretAccessKey, bucketName, region} = useSelector((state: RootState) => state.config);

  const dispatch = useDispatch();

  const listObjects = useCallback(async () => {
    if (accessKey && secretAccessKey && bucketName && region) {
      AWS.config.update({
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
        region: region
      });

      const s3 = new AWS.S3();

      try {
        const params = {
          Bucket: bucketName
        };
        
        const data = await s3.listObjectsV2(params).promise();
        
        dispatch(saveObjects(data.Contents?.map(el => { return {key: el.Key, size: el.Size, lastModified: el.LastModified?.toDateString()} } )));
      } catch (error) {
        toast.error(`Error fetching objects: ${error}`);
      }
    } else {
      toast.error('Missing aws configuration!');
    }
  }, [accessKey, secretAccessKey, bucketName, region, dispatch]);

  useEffect(() => {
    listObjects();
  }, [accessKey, secretAccessKey, bucketName, region, listObjects]);

  return (
    <div>
      <ToastContainer />
      <div className="change-config">
        <Link to="/">Change configuration</Link>
      </div>
      {accessKey && secretAccessKey && bucketName && region && (
        <div className="explorer-container card">
          <div className="dir-menu">
            <Directories />
          </div>
          <div className="dir-contents">
            <UploadFile />
            <div className="files-header">
              <div className="file-name">Name</div>
              <div className="file-size">Size</div>
              <div className="file-date">Last Modified</div>
            </div>
            <Files />
          </div>
        </div>
      )}
    </div>
  );
}

export default FileExplorer;
