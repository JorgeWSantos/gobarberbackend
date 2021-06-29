import { v4 } from 'uuid';

import IAppointmentsRepository from '@modules/appointments/interfaces/IAppointmentsRepository';
import ICreateAppointment from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.date === date,
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointment): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: v4(),
      provider_id,
      date,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}
