import {AccountModel} from '@/domain/models';

export type RegistrationParams = {
  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
};

export interface Registration {
  execute(params: RegistrationParams): Promise<AccountModel | undefined>;
}
