import { container } from 'tsyringe';
import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body;

      const sendForgotPasswordEmailService = container.resolve(
        SendForgotPasswordEmailService,
      );

      await sendForgotPasswordEmailService.execute({
        email,
      });
      return response.status(204).json();
    } catch (error: unknown) {
      if (error instanceof AppError)
        return response.status(400).json({ error: error.message });

      return response.status(500);
    }
  }
}

export default ForgotPasswordController;
