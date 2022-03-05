import FakeUsersRepository from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProviderService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'jorge willian',
      email: 'jorgews.dev@gmail.com',
      password: '11234',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'jorge',
      email: 'jorgews@gmail.com',
      password: '3355',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'jorgelogged',
      email: 'jorgs@gmail.com',
      password: '006',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });

  it('should not be able to see the providers password', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'jorge willian',
      email: 'jorgews.dev@gmail.com',
      password: '11234',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'jorge',
      email: 'jorgews@gmail.com',
      password: '3355',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'jorgelogged',
      email: 'jorgs@gmail.com',
      password: '006',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
