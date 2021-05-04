import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/interfaces/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
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
}
