import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import AWS from 'aws-sdk';

import { RootState } from '../../../redux/store';
import DeleteFile from './DeleteFile';
import File from './File';

const Files = () => {
  const {accessKey, secretAccessKey, bucketName, region} = useSelector((state: RootState) => state.config);
  const {dirStructure} = useSelector((state: RootState) => state.bucketObjects);
  const activeDirectoryPath = useSelector((state: RootState) => state.activeDirectoryPath);

  useEffect(() => {
    AWS.config.update({
      accessKeyId: accessKey,
      secretAccessKey: secretAccessKey,
      region: region
    });
  }, [accessKey, secretAccessKey, bucketName, region]);

  const activeDirPathArr = useMemo(() => activeDirectoryPath.split('/'), [activeDirectoryPath]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getValueUsingPath = useCallback((dirStructure: any, activeDirPathArr: Array<string>) => {
    return activeDirPathArr.reduce((dirStructure, activeDirPathArr) => dirStructure[activeDirPathArr], dirStructure);
  }, []);

  const getActiveDirValues = useCallback(() => {
    let values = {};

    if (activeDirectoryPath === '') {
      values = dirStructure;
    } else {
      values = getValueUsingPath(dirStructure, activeDirPathArr);
    }

    return values;
  }, [activeDirectoryPath, dirStructure, activeDirPathArr, getValueUsingPath]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemsToRender: any = getActiveDirValues();

  return (
    <div>
      {
        Object.keys(itemsToRender).map((name: string, index: number) => {
          if (name !== '__keep_dir__.txt') {
            return (
              <div key={`${name}-${index}`} className="file-container">
                <div className="file-name-container">
                  {
                    Object.defineProperty.hasOwnProperty.call(itemsToRender[name], 'isFile') && (
                      <DeleteFile fileName={name} />
                    )
                  }
                  { Object.defineProperty.hasOwnProperty.call(itemsToRender[name], 'isFile') ? <File fileName={name} /> : name}
                </div>
                {
                  Object.defineProperty.hasOwnProperty.call(itemsToRender[name], 'isFile') && (
                    <>
                      <div className="file-size">{Math.ceil(itemsToRender[name].size / 1024)} KB</div>
                      <div className="file-date">{itemsToRender[name].lastModified}</div>
                    </>
                  )
                }
              </div>
            )
          } else if (Object.keys(itemsToRender).length === 1 && itemsToRender['__keep_dir__.txt']) {
            return (
              <div key={`${name}-${index}`}>
                Delete directory: 
                <DeleteFile fileName={'__keep_dir__.txt'} />
              </div>
            )
          }

          return null;
        })
      }
    </div>
  );
}

export default Files;
