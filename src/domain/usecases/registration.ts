import {AccountModel} from '@/domain/models/account-model';

export type RegistrationParams = {
  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
};

export interface Registration {
  register(crendetials: RegistrationParams): Promise<AccountModel | undefined>;
}
