import {AccountModel} from '@/domain/models';

export type AuthenticationParams = {
  email: string;
  password: string;
};

export interface Authentication {
  auth(crendetials: AuthenticationParams): Promise<AccountModel | undefined>;
}
