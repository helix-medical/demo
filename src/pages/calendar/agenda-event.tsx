import React from 'react';
import { EventProps } from 'react-big-calendar';
import { Group, Text } from '@mantine/core';
import KindAppointment from '../../components/customBadges/kind-appointment';

const AgendaEvent = ({ event }: EventProps<any>) => {
    return (
        <Group position="left">
            <KindAppointment kind={event.kind} />
            <Text>{event.title}</Text>
        </Group>
    );
};

export default AgendaEvent;
