import React from 'react';
import { Paper, Text, ThemeIcon, Group, Grid } from '@mantine/core';
import { IconCoins, IconCreditCard, IconFileHorizontal } from '@tabler/icons-react';
import { ISum } from '../../api/accounting';

interface IProps {
    sum: ISum;
    name: string;
}

const ItemQuickView = ({ sum, name }: IProps) => {
    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                {name}
            </Text>
            <Text fz="xl" fw={700}>
                Total:{' '}
                <Text span fz="xl" fw={700} color="teal.6">
                    €{sum?.sum ?? 0}
                </Text>
            </Text>
            <Grid columns={3} mt="xs">
                <Grid.Col span={1}>
                    <Group position="center">
                        <ThemeIcon radius="md" size="lg" color={sum?.card > 0 ? 'teal' : 'gray'} variant="outline">
                            <IconCreditCard />
                        </ThemeIcon>
                        <Text fz="lg" fw={700}>
                            €{sum?.card ?? 0}
                        </Text>
                    </Group>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Group position="center">
                        <ThemeIcon radius="md" size="lg" color={sum?.cash > 0 ? 'teal' : 'gray'} variant="outline">
                            <IconCoins />
                        </ThemeIcon>
                        <Text fz="lg" fw={700}>
                            €{sum?.cash ?? 0}
                        </Text>
                    </Group>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Group position="center">
                        <ThemeIcon radius="md" size="lg" color={sum?.check > 0 ? 'teal' : 'gray'} variant="outline">
                            <IconFileHorizontal />
                        </ThemeIcon>
                        <Text fz="lg" fw={700}>
                            €{sum?.check ?? 0}
                        </Text>
                    </Group>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default ItemQuickView;
