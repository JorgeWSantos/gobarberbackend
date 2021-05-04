import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import AuthConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../interfaces/IUsersRepository';

interface IRequestAuthenticate {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestAuthenticate): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorret email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password || '');
    if (!passwordMatched) {
      throw new AppError('Incorret email/password combination.', 401);
    }

    const { secret, expiresIn } = AuthConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    delete user.password;
    return { user, token };
  }
}

export default AuthenticateUserService;
