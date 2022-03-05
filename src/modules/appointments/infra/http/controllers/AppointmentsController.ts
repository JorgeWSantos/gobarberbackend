import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { provider_id, date } = request.body;

      const parsedDate = parseISO(date);

      const createAppointment = container.resolve(CreateAppointmentService);

      const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
        user_id,
      });

      return response.status(200).json(appointment);
    } catch (error) {
      if (error instanceof AppError)
        return response.status(400).json({ error: error.message });

      return response.status(500).json();
    }
  }
}

export default AppointmentsController;
