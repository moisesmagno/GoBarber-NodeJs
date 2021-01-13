import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointementsRouter = Router();

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

        const appointment = await createAppointment.execute({provider_id, date: parseDate});

        return response.json({appointment});
    }catch(err) {
        return response.status(400).json({error: err.message});
    }
});

export default appointementsRouter;
