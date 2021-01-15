import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ id: user_id });

        if (!user) {
            throw new Error('Only authenticated users can change avatar.');
        }

        if (user.avatar) {
            // Delete currrent avatar.
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar
            );
            const userAvatarfileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarfileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        // Add the new avatar on database.
        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
