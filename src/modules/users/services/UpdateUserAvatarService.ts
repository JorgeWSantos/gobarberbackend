import path from 'path';
import fs from 'fs';
import uplodConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../interfaces/IUsersRepository';

interface IRequestUserAvatar {
  user_id: string;
  avatar_file_name: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    avatar_file_name,
  }: IRequestUserAvatar): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only Authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uplodConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); // find file

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); // delete file
      }
    }

    user.avatar = avatar_file_name;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
