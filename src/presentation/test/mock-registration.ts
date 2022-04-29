import {AccountModel} from '@/domain/models/account-model';
import {mockAccountModel} from '@/domain/test/mock-account';
import {Registration, RegistrationParams} from '@/domain/usecases/registration';

export class RegistrationSpy implements Registration {
  account = mockAccountModel();
  params: RegistrationParams | undefined;
  callsCount = 0;

  execute(params: RegistrationParams): Promise<AccountModel | undefined> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
