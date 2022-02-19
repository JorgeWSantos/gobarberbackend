import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const userCreated = await createUser.execute({
      name: 'john',
      email: 'john@gmail.com',
      password: 'john123',
    });

    expect(userCreated).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existing email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'john',
      email: 'john@gmail.com',
      password: 'john123',
    });

    await expect(
      createUser.execute({
        name: 'john',
        email: 'john@gmail.com',
        password: 'john123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
