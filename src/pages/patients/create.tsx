import React from 'react';
import { useForm, isEmail, isNotEmpty } from '@mantine/form';
import { Button, Modal, TextInput, Select, Group, Grid, Text, useMantineTheme, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import setNotification from '../system/errors/feedback-notif';
import { useNavigate } from 'react-router-dom';

interface IProps {
    show: boolean;
    toggleModal: () => void;
}

const ModalAddPatient = ({ show, toggleModal }: IProps): JSX.Element => {
    const handleClose = () => toggleModal();
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            name: '',
            lastName: '',
            birthDate: '',
            sex: '',
            email: '',
            city: '',
            address: '',
            phone: '',
            doctor: '',
            job: '',
            passif: JSON.stringify({
                medicalIssues: '',
                lastAppointments: ['0'],
            }),
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 chars' : null),
            lastName: (value) => (value.length < 2 ? 'Last name must be at least 2 chars' : null),
            sex: (value) => (value !== 'F' && value !== 'M' ? 'Sex must be at `M` or `F`' : null),
            birthDate: isNotEmpty('Birth date is required'),
            email: isEmail('Invalid email'),
            city: (value) => (value.length < 2 ? 'City must be at least 2 chars' : null),
            address: isNotEmpty('Address is required'),
            phone: (value) => (value.length < 10 ? 'Phone must be at least 10 chars' : null),
            job: isNotEmpty('Job is required'),
        },
    });

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;
        setNotification(false, 'Patient added');
        form.reset();
        toggleModal();
        navigate('/patients');
    };

    return (
        <Modal.Root opened={show} onClose={handleClose} size="lg" padding={12}>
            <Modal.Overlay
                color={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                opacity={0.55}
                blur={3}
            />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text size="xl" weight={700}>
                            Add Patient
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleClick}>
                        <Grid columns={12}>
                            <Grid.Col span={5}>
                                <TextInput
                                    placeholder="Name"
                                    label="Name"
                                    withAsterisk
                                    {...form.getInputProps('name')}
                                />
                            </Grid.Col>
                            <Grid.Col span={5}>
                                <TextInput
                                    placeholder="Last Name"
                                    label="Last Name"
                                    withAsterisk
                                    {...form.getInputProps('lastName')}
                                />
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Select
                                    label="Sex"
                                    placeholder="Sex"
                                    data={['F', 'M']}
                                    withAsterisk
                                    {...form.getInputProps('sex')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <DateInput
                                    label="Date of Birth"
                                    placeholder="Choose"
                                    withAsterisk
                                    {...form.getInputProps('birthDate')}
                                    valueFormat="DD/MM/YYYY"
                                    firstDayOfWeek={0}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="Médecin traitant"
                                    placeholder="Médecin traitant"
                                    {...form.getInputProps('doctor')}
                                />
                            </Grid.Col>
                            <Grid.Col span={8}>
                                <TextInput
                                    placeholder="Email Address"
                                    label="Email Address"
                                    withAsterisk
                                    {...form.getInputProps('email')}
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <TextInput
                                    label="Phone Number"
                                    placeholder="Phone Number"
                                    withAsterisk
                                    {...form.getInputProps('phone')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput label="Job" placeholder="Job" withAsterisk {...form.getInputProps('job')} />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="City"
                                    placeholder="City"
                                    withAsterisk
                                    {...form.getInputProps('city')}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Textarea
                                    label="Address"
                                    placeholder="Address"
                                    withAsterisk
                                    {...form.getInputProps('address')}
                                />
                            </Grid.Col>
                        </Grid>
                        <Group position="right" p="md">
                            <Button variant="light" color="red" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button color="green" type="submit">
                                Add
                            </Button>
                        </Group>
                    </form>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalAddPatient;
