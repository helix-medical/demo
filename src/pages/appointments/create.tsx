import React from 'react';
import { Button, Modal, Select, Group, Text, Grid, useMantineTheme } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import setNotification from '../system/errors/feedback-notif';
import { practitioners, patients } from './import';

interface IProps {
    show: boolean;
    toggleModal: () => void;
}

const ModalCreateApp = ({ show, toggleModal }: IProps): JSX.Element => {
    const handleClose = () => {
        form.reset();
        toggleModal();
    };
    const theme = useMantineTheme();

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;
        setNotification(false, 'Created appointment!');
        handleClose();
    };

    const form = useForm({
        initialValues: {
            patientId: '',
            date: '',
            practitioner: '',
            kind: '',
        },

        validate: {
            patientId: isNotEmpty('Patient is required'),
            date: isNotEmpty('Date is required'),
            practitioner: isNotEmpty('Practitioner is required'),
            kind: isNotEmpty('Kind is required'),
        },
    });

    return (
        <Modal.Root opened={show} onClose={handleClose}>
            <Modal.Overlay
                color={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                opacity={0.55}
                blur={3}
            />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text size="xl" weight={700}>
                            Add Appointment
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleClick}>
                        <Grid columns={12}>
                            <Grid.Col span={12}>
                                <DateTimePicker
                                    label="Date"
                                    placeholder="Date"
                                    withAsterisk
                                    {...form.getInputProps('date')}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Select
                                    label="Patient"
                                    placeholder="Patient"
                                    withAsterisk
                                    {...form.getInputProps('patientId')}
                                    data={patients.map((patient) => ({
                                        value: patient.id,
                                        label: `${patient.name} ${patient.lastName}`,
                                    }))}
                                    searchable
                                    nothingFound="No patients found, ensure you have created a patient first"
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Select
                                    label="Kind"
                                    placeholder="Kind"
                                    withAsterisk
                                    data={['first-visit', 'follow-up', 'pediatrics', 'maternity', 'emergency']}
                                    searchable
                                    dropdownPosition="bottom"
                                    {...form.getInputProps('kind')}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Select
                                    label="Practitioner"
                                    placeholder="Practitioner"
                                    withAsterisk
                                    {...form.getInputProps('practitioner')}
                                    data={practitioners.map((practitioner) => ({
                                        value: practitioner.uid,
                                        label: `${practitioner.name} ${practitioner.lastName}`,
                                    }))}
                                    searchable
                                    nothingFound="No practitioners found, ensure you have created a practitioner first"
                                />
                            </Grid.Col>
                        </Grid>
                        <Group position="right" p="md">
                            <Button variant="light" color="red" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button color="green" type="submit">
                                Submit
                            </Button>
                        </Group>
                    </form>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalCreateApp;
