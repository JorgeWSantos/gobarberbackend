import IUserTokenRepository from '@modules/users/infra/typeorm/interfaces/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

export default class UserTokensRepository implements IUserTokenRepository {
  private userTokenRepository: Repository<UserToken>;

  constructor() {
    this.userTokenRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.userTokenRepository.findOne({
      where: { token },
    });
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = await this.userTokenRepository.create({
      user_id,
    });

    await this.userTokenRepository.save(userToken);
    return userToken;
  }
}
