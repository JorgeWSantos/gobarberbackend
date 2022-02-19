import IUsersTokenRepository from '@modules/users/infra/typeorm/interfaces/IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { v4 } from 'uuid';

export default class FakeUsersTokenRepository implements IUsersTokenRepository {
  private usersToken: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: v4(),
      token: v4(),
      user_id,
    });

    this.usersToken.push(userToken);

    return userToken;
  }
}
