import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createdUserService = new CreateUserService();

    const createdUser = await createdUserService.execute({
      name,
      email,
      password,
    });

    return res.status(200).json(createdUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    console.log(req.file);
    return res.send();
  },
);
export default usersRouter;
