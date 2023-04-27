import React, { useState, useEffect } from 'react';
import {
    Button,
    Badge,
    Group,
    Grid,
    Title,
    ActionIcon,
    createStyles,
    Burger,
    Paper,
    Tooltip,
    SegmentedControl,
    useMantineTheme,
} from '@mantine/core';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';
import AppItemGrid from './item-grid';
import AppTableView from './list-view';
import ModalCreateApp from './create';

import { useDisclosure } from '@mantine/hooks';
import { appointments, IAppointment } from './import';

const useStyles = createStyles((theme) => ({
    button: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },
}));

const Patients = ({ add }: { add: boolean }): JSX.Element => {
    // Modal
    const [show, setShow] = useState(add);
    const toggleModal = () => setShow(!show);
    const [mainColor, setMainColor] = useState('fr-yellow.4');
    const theme = useMantineTheme();
    useEffect(() => {
        setMainColor(theme.colorScheme === 'dark' ? 'fr-orange.6' : 'fr-orange.4');
    }, [theme.colorScheme]);

    // View Type
    const [viewType, setViewType] = useState('grid');
    const isGrid = viewType === 'grid';

    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);

    const [period, setPeriod] = useState('all');
    const nbAppointments = appointments.length;

    const changeView = () => {
        setViewType((currentState) => {
            if (currentState === 'grid') return 'table';
            else return 'grid';
        });
    };

    return (
        <>
            <Grid justify="space-between" align="center" p="md">
                <Group>
                    <Title order={1}>
                        Appointments{' '}
                        <Badge size="xl" radius="lg" variant="filled" color={mainColor}>
                            {nbAppointments}
                        </Badge>
                    </Title>
                </Group>
                <Group>
                    <SegmentedControl
                        value={period}
                        onChange={(value) => setPeriod(value)}
                        data={[
                            { label: 'Past', value: 'past' },
                            { label: 'All', value: 'all' },
                            { label: 'Upcoming', value: 'upcoming' },
                        ]}
                        color={mainColor}
                    />

                    <Tooltip label={isGrid ? 'Table' : 'Grid'} withArrow position="bottom" color={mainColor}>
                        <ActionIcon
                            color={mainColor}
                            variant="outline"
                            size="lg"
                            onClick={changeView}
                            className={classes.button}
                        >
                            {isGrid ? <IconLayoutList /> : <IconLayoutGrid />}
                        </ActionIcon>
                    </Tooltip>
                    <Button onClick={toggleModal} className={classes.button} color={mainColor}>
                        New Appointment
                    </Button>
                    <Burger opened={opened} className={classes.burger} onClick={toggle} />
                    {opened && (
                        <Button onClick={toggleModal} color={mainColor}>
                            New Appointment
                        </Button>
                    )}
                </Group>
            </Grid>
            <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
                {isGrid ? (
                    <Grid columns={12}>
                        {appointments.map((appointment: IAppointment) => (
                            <Grid.Col xs={6} sm={4} md={3} lg={3} xl={2} key={appointment.appID}>
                                <AppItemGrid key={appointment.appID} appointment={appointment} />
                            </Grid.Col>
                        ))}
                    </Grid>
                ) : (
                    <AppTableView appointments={appointments} />
                )}
            </Paper>
            {show && <ModalCreateApp show={show} toggleModal={toggleModal} />}
        </>
    );
};

export default Patients;
