import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '../entities/User';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(data: User): Promise<User>;
}
