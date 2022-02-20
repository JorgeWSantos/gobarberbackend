import IUsersTokensRepository from '@modules/users/infra/typeorm/interfaces/IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { v4 } from 'uuid';

export default class FakeUsersTokenRepository
  implements IUsersTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: v4(),
      token: v4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user = this.userTokens.find(userToken => userToken.token === token);

    return user;
  }
}
