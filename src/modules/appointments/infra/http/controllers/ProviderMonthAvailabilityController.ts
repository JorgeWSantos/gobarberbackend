import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import AppError from '@shared/errors/AppError';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { provider_id } = request.params;

      const { month, year } = request.body;

      const listProviderMonthAvailability = container.resolve(
        ListProviderMonthAvailabilityService,
      );

      const availability = await listProviderMonthAvailability.execute({
        provider_id,
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

export default ProviderMonthAvailabilityController;
