import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
      const createdUserService = container.resolve(CreateUserService);

      const createdUser = await createdUserService.execute({
        name,
        email,
        password,
      });

      return response.status(200).json(createdUser);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default UsersController;
