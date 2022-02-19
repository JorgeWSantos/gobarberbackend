import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../infra/typeorm/repositories/fakes/FakeUsersTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokenRepository,
    );
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'adam',
      email: 'adam@gmail.com',
      password: '123',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'adam@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover password of a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'john@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');

    await fakeUsersRepository.create({
      name: 'adam',
      email: 'adam@gmail.com',
      password: '123',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'adam@gmail.com',
    });

    expect(generateToken).toHaveBeenCalled();
  });
});
