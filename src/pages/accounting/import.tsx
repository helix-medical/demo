import data from '../../data/accounting.json';

export interface ITransactions {
    uid: string;
    date: string;
    method: string;
    amount: string;
    patientName: string;
    patientLastName: string;
    appointment: string;
}

export interface ISum {
    type: string;
    sum: number;
    cash: number;
    check: number;
    card: number;
}

export interface IFacture {
    uid: string;
    date: string;
    amount: string;
    patientName: string;
    patientLastName: string;
    appointment: string;
    status: string;
}

export interface IProps {
    transactions: ITransactions[];
    sum: ISum[];
}

const accounting = data as IProps;

export const sum = accounting.sum;
export const transactions = accounting.transactions;

export default accounting;
