import { startOfHour } from 'date-fns';

import Appointement from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider: string,
    date: Date
};

class CreateAppointmentService {

    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({provider, date}: Request): Appointement {

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findAppointment(appointmentDate);

        if (findAppointmentInSameDate) {
            throw('this appointment is already booked!')
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate
        });

        return appointment;
    }
}

export default CreateAppointmentService;
