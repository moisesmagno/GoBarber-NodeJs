import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointement from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider: string,
    date: Date
};

class CreateAppointmentService {
    public async execute({provider, date}: Request): Promise<Appointement> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findAppointment(appointmentDate);

        if (findAppointmentInSameDate) {
            throw Error('this appointment is already booked!')
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
