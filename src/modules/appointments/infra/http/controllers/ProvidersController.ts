import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import ListProviderService from '@modules/appointments/services/ListProviderService';
import AppError from '@shared/errors/AppError';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const listProviders = container.resolve(ListProviderService);

      const providers = await listProviders.execute({
        user_id,
      });

      return response.status(200).json(providers);
    } catch (error) {
      if(error instanceof AppError)
        return response.status(400).json({ error: error.message });

      return response.status(500).json()
    }
  }
}

export default AppointmentsController;
