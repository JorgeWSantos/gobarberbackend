import UserToken from '../entities/UserToken';

export default interface IUserTokenRepository {
  generate(user_id: string): Promise<UserToken>;
}
