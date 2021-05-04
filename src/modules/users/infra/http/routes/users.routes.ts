import multer from 'multer';
import { Router } from 'express';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import UsersController from '../controllers/UsersControllers';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
