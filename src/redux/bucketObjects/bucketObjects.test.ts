import { IBucketObject } from '../../types/IBucketObject';
import reducer, { reset, saveObjects, addObject, deleteObject } from './bucketObjectsSlice';

const mockedStructure = {
  dirStructure: {
    prefix: {
      ['file1.txt']: {
        isFile: true,
        size: 10,
        lastModified: 'Mar'
      },
      prefix2: {
        ['file2.txt']: {
          isFile: true,
          size: 12,
          lastModified: 'Mar'
        },
      }
    }
  },
  rawObjects: [
    {
      key: 'prefix/file1.txt',
      size: 10,
      lastModified: 'Mar'
    },
    {
      key: 'prefix/prefix2/file2.txt',
      size: 12,
      lastModified: 'Mar'
    },
  ]
};

const inputDataAddObject: IBucketObject = {
  key: 'prefix/file3.txt',
  size: 18,
  lastModified: 'Feb'
}

const mockStructureAddObject = {
  "dirStructure": {
    "prefix": {
      "file1.txt": {
        "isFile": true,
        "lastModified": "Mar",
        "size": 10
      },
      "file3.txt": {
        "isFile": true,
        "lastModified": "Feb",
        "size": 18
      },
      "prefix2": {
        "file2.txt": {
          "isFile": true,
          "lastModified": "Mar",
          "size": 12
        }
      }
    }
  },
  "rawObjects": [
    {
      "key": "prefix/file1.txt",
      "lastModified": "Mar",
      "size": 10
    },
    {
      "key": "prefix/prefix2/file2.txt",
      "lastModified": "Mar",
      "size": 12
    },
    {
      "key": "prefix/file3.txt",
      "lastModified": "Feb",
      "size": 18
    }
  ]
}

describe('BucketObjects test suite', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({"dirStructure": {}, "rawObjects": []});
  });

  test('reset returns initial data', () => {
    expect(reducer(mockedStructure, reset())).toEqual({"dirStructure": {}, "rawObjects": []});
  });

  test('saveObjects sets correct data', () => {
    const inputData = [
      {
        key: 'prefix/file1.txt',
        size: 10,
        lastModified: 'Mar'
      },
      {
        key: 'prefix/prefix2/file2.txt',
        size: 12,
        lastModified: 'Mar'
      },
    ]
    

    expect(reducer(undefined, saveObjects(inputData))).toEqual(mockedStructure);
  });

  test('addObject sets correct data', () => {
    expect(reducer(mockedStructure, addObject(inputDataAddObject))).toEqual(mockStructureAddObject);
  });

  test('deleteObject filters data', () => {
    expect(reducer(mockStructureAddObject, deleteObject({key: inputDataAddObject.key}))).toEqual(mockedStructure);
  });
});
