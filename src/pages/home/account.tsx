import React from 'react';
import { useState } from 'react';
import { Button, Title, TextInput, Card, Center, Grid } from '@mantine/core';
import ChangePassword from './change-password';
import cnf from '../../config/config';
import moment from 'moment';
import users from '../../api/users';

const Account = ({ id }: { id: string }): JSX.Element => {
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);
    const user = users.find((u) => u.uid === id);

    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
                <Center>
                    <Title order={2}>Account</Title>
                </Center>
                <Grid columns={12} p="md">
                    <Grid.Col span={6}>
                        <TextInput label="Account ID" defaultValue={user?.uid} readOnly />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Role" defaultValue={user?.role} readOnly />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Name" defaultValue={user?.name} readOnly />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Last Name" defaultValue={user?.lastName} readOnly />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Status" defaultValue={user?.state} readOnly />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Last Connection"
                            defaultValue={moment(user?.lastActive).format(cnf.formatDateTimePretty)}
                            readOnly
                        />
                    </Grid.Col>
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={toggleModal}>
                        Change Password
                    </Button>
                </Grid>
            </Card>
            <ChangePassword show={show} toggleModal={toggleModal} />
        </>
    );
};

export default Account;
