import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uplodConfig from '../config/upload';
import AppError from '../errors/AppError';

interface RequestUserAvatar {
  user_id: string;
  avatar_file_name: string;
}

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatar_file_name,
  }: RequestUserAvatar): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(user_id);

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
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
