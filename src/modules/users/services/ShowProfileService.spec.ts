import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('ShowProfile', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(
      fakeUsersRepository,
    );
  })

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'jorge willian',
      email: 'jorgews.dev@gmail.com',
      password: '11234',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('jorge willian');
    expect(profile.email).toBe('jorgews.dev@gmail.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(showProfile.execute({
      user_id: 'non-existing-id',
    })).rejects.toBeInstanceOf(AppError);
  });
});
