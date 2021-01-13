import { getRepository } from 'typeorm';
import { hash } from "bcryptjs";

import User from '../models/User';

interface request {
    name: string,
    email: string,
    password: string,
}

class CreateUserService {
    public async execute({ name, email, password }: request): Promise<User> {
        const userGetRepository = getRepository(User);

        const checkUserExists = await userGetRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new Error('Email address already used.');
        }

        const hashecPassword = await hash(password, 8);

        const user = await userGetRepository.create({
            name,
            email,
            password: hashecPassword,
        });

        await userGetRepository.save(user);

        return user;
    }
}

export default CreateUserService;
