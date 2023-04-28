import React from 'react';
import { EventWrapperProps, momentLocalizer } from 'react-big-calendar';
import Event from './event';
import moment from 'moment';

const EventWrapper = ({ event, continuesEarlier, continuesLater }: EventWrapperProps<any>) => {
    return (
        <>
            <Event
                event={event}
                continuesAfter={continuesLater}
                continuesPrior={continuesEarlier}
                slotEnd={event.end}
                slotStart={event.start}
                title={event.title}
                isAllDay={false}
                localizer={momentLocalizer(moment)}
            />
        </>
    );
};

export default EventWrapper;
