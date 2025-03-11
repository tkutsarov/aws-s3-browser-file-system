import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { DirStructureType } from '../../types/DirStructureType';
import { IBucketObject } from '../../types/IBucketObject'; 

/**
 * Generates an object with structure easier for rendering used in the components.
 * 
 * @param rawObjects 
 * @returns
 */
const buildDirStructure = (rawObjects: IBucketObject[] | null): DirStructureType => {
  if (rawObjects !== null && rawObjects.length > 0) {
    const objKeys = rawObjects.map((object: IBucketObject) => object.key);

    const dirStructure = {}
    objKeys.forEach(function(path: string, index: number) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      path.split('/').reduce<Record<string, any>>((acc, current) => {
        return acc[current] || (current.indexOf(".") === -1 ? (acc[current] = {}) : acc[current]={isFile: true, size: rawObjects[index].size, lastModified: rawObjects[index].lastModified})
      }, dirStructure)
    })
  
    return dirStructure;
  }

  return {};
}

const initialState: {rawObjects: IBucketObject[], dirStructure: DirStructureType} = {
  rawObjects: [],
  dirStructure: {}
}

export const bucketObjectsSlice = createSlice({
  name: 'bucketObjects',
  initialState,
  reducers: {
    reset: () => initialState,
    saveObjects: (state, action) => {
      state.rawObjects = action.payload;
      state.dirStructure = buildDirStructure(action.payload);
    },
    addObject: (state, action: PayloadAction<IBucketObject> ) => {
      state.rawObjects.push(action.payload);      
      state.dirStructure = buildDirStructure(state.rawObjects);
    },
    deleteObject: (state, action: PayloadAction<{key: string}>) => {
      state.rawObjects = state.rawObjects.filter((obj: IBucketObject) => obj.key !== action.payload.key);      
      state.dirStructure = buildDirStructure(state.rawObjects);
    }
  }
});

export const { reset, saveObjects, addObject, deleteObject } = bucketObjectsSlice.actions

export default bucketObjectsSlice.reducer
