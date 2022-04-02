import {AccountModel} from '@/domain/models/account-model';
import {mockAccountModel} from '@/domain/test/mock-account';
import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/authentication';

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams | undefined;
  callsCount = 0;

  auth(crendetials: AuthenticationParams): Promise<AccountModel | undefined> {
    this.callsCount++;
    this.params = crendetials;
    return Promise.resolve(this.account);
  }
}
