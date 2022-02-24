import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  })

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'jorge willian',
      email: 'jorgews.dev@gmail.com',
      password: '11234',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'jorgeeeeee',
      email: 'jorge@jorgin.com'
    });

    expect(updatedUser.name).toBe('jorgeeeeee');
    expect(updatedUser.email).toBe('jorge@jorgin.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'jorge willian',
      email: 'jorgews.dev@gmail.com',
      password: '11234',
    });

    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@gmail.com',
      password: '11234',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'jorge willian',
      email: 'jorgews.dev@gmail.com'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'jorge willian',
      email: 'jorgews.dev@gmail.com',
      password: '11234',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'jorgeeeeee',
      email: 'jorge@jorgin.com',
      old_password: '11234',
      password: '11234fdg'
    });

    expect(updatedUser.password).toBe('11234fdg');
  });

  it('should not be able to update the password without wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'jorge willian',
      email: 'jorgews.dev@gmail.com',
      password: '11234',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'jorgeeeeee',
      email: 'jorge@jorgin.com',
      password: '11234fdg',
      old_password: 'wrong-old-password'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an non-existing profile', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-id',
      email: 'jorge@gmail.com',
      name: 'jorge',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an non-existing profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'jorge willian',
      email: 'jorgews.dev@gmail.com',
      password: '11234',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      email: 'jorge@gmail.com',
      name: 'jorge',
      password: 'teste'
    })).rejects.toBeInstanceOf(AppError);
  });
});
