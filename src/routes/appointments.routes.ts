import { Router } from 'express';
import {startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointementsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointementsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});

appointementsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findAppointment(parsedDate);

    if (findAppointmentInSameDate) {
        return response.status(400).json({message: 'This appointment is already booked!'});
    }

    const appointment = appointmentsRepository.create({
        provider,
        date: parsedDate
    });

    return response.json({appointment});
});

export default appointementsRouter;
