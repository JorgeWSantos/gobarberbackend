import { container } from 'tsyringe';
import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUserService = container.resolve(
        AuthenticateUserService,
      );

      const { user, token } = await authenticateUserService.execute({
        email,
        password,
      });
      return response.status(200).json({ user, token });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default SessionsController;
