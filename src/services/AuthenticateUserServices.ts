import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

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

        const token = sign({}, '27ec91ddfd8216fe2f74482edbd83fd1', {
            subject: user.id,
            expiresIn: '1d'
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
