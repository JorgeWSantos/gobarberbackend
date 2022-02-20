import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserAvatar = container.resolve(UpdateUserAvatarService);
      const user_id = request.user.id;
      const user = await updateUserAvatar.execute({
        user_id,
        avatar_file_name: request.file?.filename || '',
      });

      delete user.password;
      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default UserAvatarController;
