import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import AppError from '@shared/errors/AppError';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { provider_id } = request.params;

      const { day, year, month } = request.body;

      const listProviderDayAvailability = container.resolve(
        ListProviderDayAvailabilityService,
      );

      const availability = await listProviderDayAvailability.execute({
        provider_id,
        day,
        month,
        year,
      });

      return response.status(200).json(availability);
    } catch (error) {
      if (error instanceof AppError)
        return response.status(400).json({ error: error.message });

      return response.status(500).json();
    }
  }
}

export default ProviderDayAvailabilityController;
