import {SaveAccessToken} from '@/domain/usecases/save-access-token';

export class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: string = '';
  async save(accessToken: string) {
    this.accessToken = accessToken;
  }
}
