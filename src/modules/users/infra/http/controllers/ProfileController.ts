import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    try {
      const showProfile = container.resolve(ShowProfileService);

      const user = await showProfile.execute({
        user_id
      })

      return response.status(200).json(user);
    } catch (error) {
      if(error instanceof AppError)
        return response.status(400).json({ error: error.message });

      return response.status(500).json()
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name, email, password, old_password } = request.body;
      const createdUserService = container.resolve(UpdateProfileService);

      const updateProfile = await createdUserService.execute({
        name,
        email,
        password,
        old_password,
        user_id
      });

      return response.status(200).json(updateProfile);
    } catch (error) {
      if(error instanceof AppError)
        return response.status(400).json({ error: error.message });

      return response.status(500).json()
    }
  }
}

export default ProfileController;
