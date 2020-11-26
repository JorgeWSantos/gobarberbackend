import { Router } from 'express';
import multer from 'multer';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
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
    const updateUserAvatar = new UpdateUserAvatarService();
    const user_id = req.user.id;
    const user = await updateUserAvatar.execute({
      user_id,
      avatar_file_name: req.file.filename,
    });

    delete user.password;
    return res.status(200).json(user);
  },
);

export default usersRouter;
