import { Router } from 'express';
import { uuid } from 'uuidv4';
import {startOfHour, parseISO, isEqual } from 'date-fns';

const appointementsRouter = Router();

interface Appointement {
    id: string,
    provider: string,
    date: Date
}

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

    const appointment = {
        id: uuid(),
        provider,
        date: parseDate
    }

    appointments.push(appointment);

    response.json({appointment});
});

export default appointementsRouter;
