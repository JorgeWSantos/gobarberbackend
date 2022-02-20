import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import User from '@modules/users/infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '../infra/typeorm/interfaces/IUsersRepository';
import IUserTokensRepository from '../infra/typeorm/interfaces/IUserTokensRepository';

interface IRequestUser {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequestUser): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError(`User does not exists`);

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação recebido ${token}.`,
    );
  }
}

export default SendForgotPasswordEmailService;
