import {mockAccountModel} from '@/domain/test';
import {LocalStorageAdapter} from '@/infra/cache/local-storage-adapter';
import {setCurrentAccountAdapter} from './current-account-adapter';

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', JSON.stringify(account));
  });
});
