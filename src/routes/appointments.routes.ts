import { Router } from 'express';
import { uuid } from 'uuidv4';
import {startOfHour, parseISO } from 'date-fns';

const appointementsRouter = Router();

const appointments = [];

appointementsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    
    const parseDate = startOfHour(parseISO(date))

    const appointment = {
        id: uuid(),
        provider, 
        date: parseDate
    }

    appointments.push(appointment);

    response.json({appointment});
});

export default appointementsRouter;