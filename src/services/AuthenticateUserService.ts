import { getRepository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import User from '../models/User';

interface RequestAuthenticate {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: RequestAuthenticate): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('Incorret email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorret email/password combination.');
    }

    delete user.password;
    return user;
  }
}

export default AuthenticateUserService;
