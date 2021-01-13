import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointement from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider_id: string,
    date: Date,
};

class CreateAppointmentService {
    public async execute({provider_id, date}: Request): Promise<Appointement> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findAppointment(appointmentDate);

        if (findAppointmentInSameDate) {
            throw Error('this appointment is already booked!')
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
