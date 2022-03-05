import ListProviderMonthAvailability from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '../infra/typeorm/repositories/fakes/FakeAppointmentsRepository';

let listProviderMonthAvailability: ListProviderMonthAvailability;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailability(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    for (let index = 8; index < 18; index++) {
      await fakeAppointmentsRepository.create({
        date: new Date(2020, 4, 20, index, 0, 0),
        provider_id: 'user1',
        user_id: 'user-id',
      });
    }

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 5, 20, 21, 0, 0),
      provider_id: 'user1',
      user_id: 'user-id',
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user1',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
