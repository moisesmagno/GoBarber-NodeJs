import { Router } from 'express';
import {startOfHour, parseISO, isEqual } from 'date-fns';
import Appointement from '../models/Appointment';

const appointementsRouter = Router();

const appointments: Appointement[] = [];

appointementsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parseDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointments.find(appointment =>
        isEqual(parseDate, appointment.date)
    );

    if (findAppointmentInSameDate) {
        return response.status(400).json({message: 'This appointment is already booked!'});
    }

    const appointment = new Appointement(provider, parseDate);

    appointments.push(appointment);

    response.json({appointment});
});

export default appointementsRouter;
