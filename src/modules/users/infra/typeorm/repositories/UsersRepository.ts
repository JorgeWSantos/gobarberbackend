import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import IUserRepository from '@modules/users/infra/typeorm/interfaces/IUsersRepository';
import { getRepository, Repository, Not } from 'typeorm';
import User from '../entities/User';

export default class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.userRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.userRepository.save(user);

    return user;
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if(except_user_id) {
      users = await this.userRepository.find({
        where: {
          id: Not(except_user_id)
        }
      });
    }

    else {
      users = await this.userRepository.find();
    }

    // @ts-expect-error
    users.map(user => (delete user.password))

    return users;
  }
}
