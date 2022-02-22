import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

  })

  it('should be able to create a new user', async () => {
    const userCreated = await createUser.execute({
      name: 'john',
      email: 'john@gmail.com',
      password: 'john123',
    });

    expect(userCreated).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existing email', async () => {
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
