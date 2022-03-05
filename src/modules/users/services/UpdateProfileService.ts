import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../infra/typeorm/interfaces/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userEmailExists = await this.usersRepository.findByEmail(email);

    if (userEmailExists && userEmailExists.id !== user_id)
      throw new AppError('E-mail already exists.');

    user.name = name;
    user.email = email;

    if (password && !old_password)
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );

    if (password && old_password) {
      let checkOldPassword: boolean;

      checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password as string,
      );

      user.password = await this.hashProvider.generateHash(password);

      if (!checkOldPassword) throw new AppError('Old password does not match.');
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
