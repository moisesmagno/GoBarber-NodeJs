import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import authAutenticated from '../middlewares/ensureAuthenticated';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointementsRouter = Router();

// Caso o middleware passe a ser usado em todas as rotas, se não é só aplica-la na rota específica.
appointementsRouter.use(authAutenticated);

appointementsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointementsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            provider_id,
            date: parseDate,
        });

        return response.json({ appointment });
    } catch(err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointementsRouter;
