import React, { useState, useEffect } from 'react';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';
import {
    ActionIcon,
    Badge,
    Button,
    createStyles,
    Grid,
    Group,
    Paper,
    Title,
    Tooltip,
    useMantineTheme,
} from '@mantine/core';
import PatientItemGrid from './item-grid';
import ModalAddPatient from './create';
import PatientsTableView from './list-view';
import patients, { IPatient } from './import';
import setNotification from '../system/errors/feedback-notif';

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
    const [mainColor, setMainColor] = useState('fr-yellow.4');
    const theme = useMantineTheme();
    const [refresh, setRefresh] = useState<boolean>(false);
    // Modal for create a patient
    const [show, setShow] = useState(add);
    const toggleModal = () => {
        setShow(!show);
        setRefresh(!refresh);
    };

    // View Type
    const [viewType, setViewType] = useState('grid');
    const isGrid: boolean = viewType === 'grid';

    // Fetch all patients
    const { classes } = useStyles();
    const nbPatients = patients.length;

    useEffect(() => {
        setMainColor(theme.colorScheme === 'dark' ? 'fr-yellow.6' : 'fr-yellow.4');
    }, [theme.colorScheme]);

    // Delete a patient
    const handleDelete = (id: string | undefined) => {
        setNotification(false, `Patient ${id} deleted`);
    };

    const changeView = () => {
        setViewType((currentState) => {
            if (currentState === 'grid') return 'table';
            else return 'grid';
        });
    };

    return (
        <>
            <Grid justify="space-between" align="center" p="md">
                <Group position="left">
                    <Title order={1}>
                        Patients{' '}
                        <Badge size="xl" radius="lg" variant="filled" color={mainColor}>
                            {nbPatients}
                        </Badge>
                    </Title>
                </Group>
                <Group position="right">
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
                    <Button onClick={toggleModal} color={mainColor}>
                        New Patient
                    </Button>
                </Group>
            </Grid>
            <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
                {isGrid ? (
                    <Grid columns={12}>
                        {patients.map((patient: IPatient) => (
                            <Grid.Col xs={6} sm={4} md={3} lg={3} xl={2} key={patient.id}>
                                <PatientItemGrid key={patient.id} patient={patient} handleDelete={handleDelete} />
                            </Grid.Col>
                        ))}
                    </Grid>
                ) : (
                    <PatientsTableView patients={patients} handleDelete={handleDelete} />
                )}
            </Paper>
            <ModalAddPatient show={show} toggleModal={toggleModal} />
        </>
    );
};

export default Patients;
