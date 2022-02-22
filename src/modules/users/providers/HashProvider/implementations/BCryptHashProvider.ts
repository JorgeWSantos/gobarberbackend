import { hash, compare } from 'bcrypt';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  public generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}

export default BCryptHashProvider;
