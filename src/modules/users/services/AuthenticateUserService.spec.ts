import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  })

  it('should be able to authenticate', async () => {
    const userCreated = await createUser.execute({
      name: 'john',
      email: 'john@gmail.com',
      password: 'john123',
    });

    const response = await authenticateUser.execute({
      email: 'john@gmail.com',
      password: 'john123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(userCreated);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'john@gmail.com',
        password: 'john123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorret password', async () => {
    await createUser.execute({
      name: 'john',
      email: 'john@gmail.com',
      password: 'john123',
    });

    await expect(
      authenticateUser.execute({
        email: 'john@gmail.com',
        password: 'senhaIncorreta',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
