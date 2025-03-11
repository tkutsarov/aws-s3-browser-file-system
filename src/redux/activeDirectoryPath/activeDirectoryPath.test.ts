import reducer, { reset, updateActiveDirectoryPath } from './activeDirectoryPathSlice';

describe('ActiveDirectoryPath test suite', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual('');
  });

  test('reset returns initial data', () => {
    const previousState = 'some/path';

    expect(reducer(previousState, reset())).toEqual('');
  });

  test('updateActiveDirectoryPath returns correct data', () => {
    const previousState = 'some/path';

    expect(reducer(previousState, updateActiveDirectoryPath('another/path'))).toEqual('another/path');
  });
});
