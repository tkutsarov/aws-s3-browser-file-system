import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

export const activeDirectoryPathSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    reset: () => initialState,
    updateActiveDirectoryPath: (_, action) => {
      return action.payload
    }
  }
});

export const { reset, updateActiveDirectoryPath } = activeDirectoryPathSlice.actions

export default activeDirectoryPathSlice.reducer
