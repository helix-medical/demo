import data from '../data/users.json';

export interface IUser {
    uid: string;
    name: string;
    lastName: string;
    lastActive: string;
    state: string;
    role: string;
    password: string;
}

const users = data as IUser[];

export default users;
