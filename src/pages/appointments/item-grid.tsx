import React from 'react';
import { Card, Text, Button, Group } from '@mantine/core';
import KindAppointment from '../../components/customBadges/kind-appointment';
import { IAppointment } from '../../api/appointments';
import { useNavigate } from 'react-router-dom';
import cnf from '../../config/config';
import moment from 'moment';

interface IProps {
    appointment: IAppointment;
}

const AppItemGrid = ({ appointment }: IProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <div key={appointment.appID}>
            <Card radius="md" withBorder shadow="sm" padding="lg">
                <Group position="center" mb="xs">
                    <Text size="xl" weight={700}>
                        {appointment.pName} {appointment.pLastName}
                    </Text>
                    <Text size="sm">{moment(appointment.date).format(cnf.formatDateTimePretty)}</Text>
                    <KindAppointment kind={appointment.kind} />
                </Group>
                <Button
                    variant="light"
                    radius="md"
                    mt="md"
                    fullWidth
                    color="fr-orange.4"
                    onClick={() =>
                        navigate(
                            `/demo/appointments/${appointment.appID}/${appointment.status === 'finished' ? 'view' : 'edit'}`
                        )
                    }
                >
                    {appointment.status !== 'pending' ? 'View' : 'Edit'}
                </Button>
            </Card>
        </div>
    );
};

export default AppItemGrid;
