import React, { useEffect } from 'react';
import { IAppointment } from '../../api/appointments';
import { IconSearch } from '@tabler/icons-react';
import { keys } from '@mantine/utils';
import { Table, ScrollArea, Text, TextInput, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import cnf from '../../config/config';
import IdBadge from '../../components/customBadges/id';
import KindAppointment from '../../components/customBadges/kind-appointment';
import moment from 'moment';
import Th from '../../components/th-sort';

interface IProps {
    appointments: IAppointment[];
}

const filterData = (data: any[], search: string) => {
    const query = search.toLowerCase().trim();
    return data.filter((item) => keys(data[0]).some((key) => item[key].toLowerCase().includes(query)));
};

const sortData = (data: any[], payload: { sortBy: keyof IAppointment | null; reversed: boolean; search: string }) => {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
};

const AppTableView = ({ appointments }: IProps): JSX.Element => {
    const [search, setSearch] = useState<string>('');
    const [sortedData, setSortedData] = useState(appointments);
    const [sortBy, setSortBy] = useState<keyof IAppointment | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setSortedData(sortData(appointments, { sortBy, reversed: reverseSortDirection, search }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appointments]);

    const setSorting = (field: keyof IAppointment) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(appointments, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(appointments, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((row) => (
        <tr key={row.appID}>
            <td>
                <IdBadge id={row.appID ?? ''} />
            </td>
            <td>{row.name}</td>
            <td>{row.lastName}</td>
            <td>{moment(row.date).format(cnf.formatDateTimePretty)}</td>
            <td>
                <KindAppointment kind={row.kind} />
            </td>
            <td>
                <Button
                    variant="light"
                    color="fr-orange.4"
                    p={row.status !== 'pending' ? 'xs' : 'sm'}
                    onClick={() =>
                        navigate(`/appointments/${row.appID}/${row.status === 'finished' ? 'view' : 'edit'}`)
                    }
                >
                    {row.status !== 'pending' ? 'View' : 'Edit'}
                </Button>
            </td>
        </tr>
    ));

    return (
        <ScrollArea>
            <TextInput
                placeholder="Search an appointment"
                mb="md"
                icon={<IconSearch size="0.9rem" stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table
                horizontalSpacing="md"
                verticalSpacing="md"
                miw={700}
                sx={{ tableLayout: 'fixed' }}
                highlightOnHover
                withColumnBorders
            >
                <thead>
                    <tr>
                        <th>appID</th>
                        <Th
                            sorted={sortBy === 'name'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('name')}
                        >
                            Name
                        </Th>
                        <Th
                            sorted={sortBy === 'lastName'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('lastName')}
                        >
                            Last Name
                        </Th>
                        <Th
                            sorted={sortBy === 'date'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('date')}
                        >
                            Date
                        </Th>
                        <Th
                            sorted={sortBy === 'kind'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('kind')}
                        >
                            Kind
                        </Th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <tr>
                            <td colSpan={6}>
                                <Text weight={500} align="center">
                                    No appointments found
                                </Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </ScrollArea>
    );
};

export default AppTableView;
