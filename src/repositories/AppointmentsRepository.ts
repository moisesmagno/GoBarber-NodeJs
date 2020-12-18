import { isEqual } from 'date-fns';
import Appointement from '../models/Appointment';

interface CreateAppointmentDTO {
    provider: string,
    date: Date
}

class AppointmentsRepository {
    private appointments: Appointement[];

    constructor(){
        this.appointments = [];
    }

    public all(): Appointement[] {
        return this.appointments;
    }

    public findAppointment(date: Date): Appointement | null {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date)
        );

        return findAppointment || null;
    }

    public create({provider, date}: CreateAppointmentDTO): Appointement{
        const appointment = new Appointement({provider, date});

        this.appointments.push(appointment);

        return appointment;
    }

}

export default AppointmentsRepository;
