import {mockAccountModel} from '@/domain/test';
import {LocalStorageAdapter} from '@/infra/cache/local-storage-adapter';
import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter,
} from './current-account-adapter';

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter set with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });

  test('should call LocalStorageAdapter get with correct values', async () => {
    const account = mockAccountModel();
    const getSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockResolvedValueOnce(account);
    const accountStoraged = await getCurrentAccountAdapter();
    expect(getSpy).toHaveBeenCalledWith('account');
    expect(accountStoraged).toEqual(account);
  });
});
