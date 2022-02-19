import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../infra/typeorm/interfaces/IUsersRepository';
import IHashProvider from '../providers/HashProviders/models/IHashProvider';

interface IRequestUser {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequestUser): Promise<User> {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('This email already exist.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const newUser = await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    const newUserCloned = JSON.parse(JSON.stringify(newUser));

    delete newUserCloned.password;

    return newUserCloned;
  }
}

export default CreateUserService;
