import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

const appointmentsController = new AppointmentsController();

// appointmentsRouter.get('/', async (req, res) => {
//   const allAppointments = await appointmentsRepository.find();

//   return res.status(200).json(allAppointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
