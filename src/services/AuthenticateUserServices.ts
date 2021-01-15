import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRespository = getRepository(User);

        const user = await userRespository.findOne({
            where: { email },
        });

        if (!user) {
            throw new Error('Incorrect email/password combination!');
        }

        const passwordMatch = compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Incorrect email/password combination!');
        }

        const { secret, expiretIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiretIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
