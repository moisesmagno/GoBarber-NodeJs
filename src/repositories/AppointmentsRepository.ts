import Appointement from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointement)
class AppointmentsRepository extends Repository<Appointement>{

    public async findAppointment(date: Date): Promise<Appointement | null> {
        const findAppointment = await this.findOne({
            where: {date: date}
        });

        return findAppointment || null;
    }
}

export default AppointmentsRepository;
