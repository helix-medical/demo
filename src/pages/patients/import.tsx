import data from '../../data/patients.json';

export interface IPatient {
    id: string;
    name: string;
    lastName: string;
    birthDate: string;
    sex: string;
    city: string;
    email: string;
    phone: string;
    address: string;
    job: string;
    doctor: string;
    passif: string;
}

const patients = data as IPatient[];

export default patients;
