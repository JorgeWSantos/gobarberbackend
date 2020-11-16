import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

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

export default usersRouter;
