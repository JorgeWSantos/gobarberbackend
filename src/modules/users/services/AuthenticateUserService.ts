import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import AuthConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUserRepository from '../infra/typeorm/interfaces/IUsersRepository';

interface IRequestAuthenticate {
  email: string;
  password: string;
}

interface IUserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
  avatar?: string;
}

interface IResponse {
  user: IUserResponse;
  token: string;
}

@injectable()
class AuthenticateUserService {
  private userWithoutPassword: IUserResponse;

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestAuthenticate): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorret email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorret email/password combination.', 401);
    }

    const { secret, expiresIn } = AuthConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    // @ts-expect-error
    delete user['password'];

    return { user, token };
  }
}

export default AuthenticateUserService;
