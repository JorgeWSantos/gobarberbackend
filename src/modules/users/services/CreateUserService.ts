import { hash } from 'bcrypt';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../interfaces/IUsersRepository';

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
  ) {}

  public async execute({ name, email, password }: IRequestUser): Promise<User> {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('This email already exist.');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    delete newUser.password;

    return newUser;
  }
}

export default CreateUserService;
