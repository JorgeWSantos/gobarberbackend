import path from 'path';
import fs from 'fs';
import uplodConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
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

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatar_file_name,
  }: IRequestUserAvatar): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only Authenticated users can change avatar.', 401);
    }

    if (user.avatar) this.storageProvider.deleteFile(user.avatar);

    const fileName = await this.storageProvider.saveFile(avatar_file_name);

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
