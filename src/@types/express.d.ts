declare namespace Express {
    // Adicionando um novo tipo dentro do Request do express.
    export interface Request {
        user: {
            id: string;
        };
    }
}
