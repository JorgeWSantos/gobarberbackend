import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import User from '../models/User';

interface RequestUser {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestUser): Promise<User> {
    const userRepository = getRepository(User);
    const userExist = await userRepository.findOne({ where: { email } });

    if (userExist) {
      throw new Error('This email already exist.');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = userRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    await userRepository.save(newUser);

    delete newUser.password;

    return newUser;
  }
}

export default CreateUserService;
