import {AccountModel} from '@/domain/models/account-model';

export type RegistrationParams = {
  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
};

export interface Registration {
  add(crendetials: RegistrationParams): Promise<AccountModel | undefined>;
}
