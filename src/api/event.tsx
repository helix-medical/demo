import data from '../data/events.json';

export interface IEvent {
    id: string;
    title: string;
    start: string;
    end: string;
    appID: string;
    calendar: string;
}

const events = data as IEvent[];

export default events;