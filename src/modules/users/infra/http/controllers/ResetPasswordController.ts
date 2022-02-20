import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import AppError from '@shared/errors/AppError';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { token, password } = request.body;

      const resetPasswordService = container.resolve(ResetPasswordService);

      await resetPasswordService.execute({
        token,
        password,
      });

      return response.status(204).json();
    } catch (error: unknown) {
      if (error instanceof AppError)
        return response.status(400).json({ error: error.message });

      return response.status(500);
    }
  }
}

export default ResetPasswordController;
