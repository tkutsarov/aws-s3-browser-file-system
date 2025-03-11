import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'; 
import AWS from 'aws-sdk';

import { RootState } from '../../../redux/store';
import { addObject } from '../../../redux/bucketObjects/bucketObjectsSlice';

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);

  const dispatch = useDispatch();

  const {accessKey, secretAccessKey, bucketName, region} = useSelector((state: RootState) => state.config);
  const activeDirectoryPath = useSelector((state: RootState) => state.activeDirectoryPath);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }, [setFile]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadFile = useCallback(async (fileName: string | undefined, fileContent: any) => {
    if (fileName) {
      try {
        const params = {
          Bucket: bucketName,
          Key: activeDirectoryPath ? `${activeDirectoryPath}/${fileName}` : fileName,
          Body: fileContent
        };

        const s3 = new AWS.S3();
        
        const data = await s3.upload(params).promise();
       
        const lastModifiedDate = file ? new Date(file.lastModified) : new Date();

        dispatch(addObject({key: data.Key, size: file?.size || 0, lastModified: lastModifiedDate.toDateString() }));
        setFile(null);
        
        toast.success('File uploaded successfully ');
      } catch (error) {
        toast.error(`Error uploading file: ${error}`);
      }
    } else {
      toast.error('File incorrectly uploaded')
    }
  }, [bucketName, activeDirectoryPath, file, dispatch]);

  useEffect(() => {
    AWS.config.update({
      accessKeyId: accessKey,
      secretAccessKey: secretAccessKey,
      region: region
    });
  }, [accessKey, secretAccessKey, bucketName, region]);

  useEffect(() => {
    if (file) {
      uploadFile(file?.name, file);
    }
  }, [file, uploadFile]);

  return (
    <div>
      <div>Upload file:</div>
      <input type="file" onChange={handleFileChange} />
    </div>
  )
}

export default UploadFile;
