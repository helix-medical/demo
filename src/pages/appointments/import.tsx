import Users from '../../data/users.json';
import Appointments from '../../data/appointments.json';
import Patients from '../../data/patients.json';

export interface IAppointment {
    address: string;
    amount: number;
    appID: string;
    birthDate: string;
    city: string;
    content: string;
    date: string;
    doctor: string;
    email: string;
    job: string;
    kind: string;
    lastName: string;
    method: string;
    name: string;
    passif: string;
    patientId: string;
    phone: string;
    pLastName: string;
    pName: string;
    sex: string;
    status: string;
}

const practitioners = Users.filter((user: any) => user.role === 'practitioner');
const patients = Patients;
const appointments = Appointments as IAppointment[];

export { patients, practitioners, appointments };
