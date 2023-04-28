import React from 'react';
import { Card, Grid, Progress, RingProgress, Text } from '@mantine/core';
import cnf from '../../config/config';
import { sum } from '../../api/accounting';

interface IProps {
    period: string;
}

const AccountingTile = ({ period }: IProps) => {
    const data = period === 'month' ? sum[0] : sum[1];
    const max =
        period === 'month'
            ? 4 * cnf.nbWorkDays * cnf.nbWorkHours * cnf.defaultAmount
            : cnf.nbWorkDays * cnf.nbWorkHours * cnf.defaultAmount;
    const allSum = (data.sum * 100) / max;

    return (
        <Card p="lg" radius="md" withBorder mb="sm">
            <Grid columns={3}>
                <Grid.Col span={1}>
                    <RingProgress
                        sections={[{ value: allSum, color: 'teal' }]}
                        label={
                            <Text size="xl" weight={700} align="center" color="teal">
                                {Math.ceil(allSum)}%
                            </Text>
                        }
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <Text fz="md" fw={700} tt="uppercase" c="dimmed">
                        {period === 'month' ? 'This month' : 'This week'}
                    </Text>
                    <Text fz="xl" fw={700} color="teal.6">
                        €{data?.sum}
                    </Text>
                    <Progress
                        style={{
                            display: data?.sum === 0 ? 'none' : 'block',
                        }}
                        mt="xl"
                        size={24}
                        radius="md"
                        sections={[
                            {
                                value: (data.card * 100) / data.sum,
                                color: 'cyan',
                                label: 'Cards',
                                tooltip: `Cards -- ${data.card}€`,
                            },
                            {
                                value: (data.cash * 100) / data.sum,
                                color: 'green',
                                label: 'Cash',
                                tooltip: `Cash -- ${data.cash}€`,
                            },
                            {
                                value: (data.check * 100) / data.sum,
                                color: 'yellow',
                                label: 'Checks',
                                tooltip: `Checks -- ${data.check}€`,
                            },
                        ]}
                    />
                </Grid.Col>
            </Grid>
        </Card>
    );
};

export default AccountingTile;
