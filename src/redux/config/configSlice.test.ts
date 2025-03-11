import reducer, { initialState, reset, updateConfig } from './configSlice';

const mockedState = {
  accessKey: 'access-key',
  secretAccessKey: 'secret-access-key',
  region: 'eu-west-1',
  bucketName: 'bucket-1'
};

describe('ConfigSlice test suite', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('reset returns initial state', () => {
    expect(reducer(mockedState, reset())).toEqual(initialState);
  });

  test('updateConfig returns correct data', () => {
    const updateData = {
      accessKey: 'access-key',
      secretAccessKey: 'secret-access-key',
      bucketName: 'bucket-1'
    }

    expect(reducer(initialState, updateConfig(updateData))).toEqual(mockedState);
  });
});
