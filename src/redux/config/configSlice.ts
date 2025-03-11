import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
  accessKey: '',
  secretAccessKey: '',
  region: 'eu-west-1',
  bucketName: ''
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    reset: () => initialState,
    updateConfig: (state, action: PayloadAction<{accessKey: string, secretAccessKey: string, bucketName: string}>) => {
      return {...state, ...action.payload}
    }
  }
});

export const { reset, updateConfig } = configSlice.actions

export default configSlice.reducer
