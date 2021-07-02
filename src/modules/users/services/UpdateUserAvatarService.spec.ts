import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import CreateUserService from './CreateUserService';

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'jorge',
      email: 'jorge@gmail.com',
      password: '123',
    });

    const userCreated = await updateUserAvatar.execute({
      avatar_file_name: 'uploads/avatar.jpg',
      user_id: user.id,
    });

    expect(userCreated.avatar).toEqual('uploads/avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        avatar_file_name: 'uploads/avatar.jpg',
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when is updating the one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'jorge',
      email: 'jorge@gmail.com',
      password: '123',
    });

    await updateUserAvatar.execute({
      avatar_file_name: 'uploads/avatar.jpg',
      user_id: user.id,
    });

    const userCreated = await updateUserAvatar.execute({
      avatar_file_name: 'uploads/avatar2.jpg',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('uploads/avatar.jpg');
    expect(userCreated.avatar).toEqual('uploads/avatar2.jpg');
  });
});
