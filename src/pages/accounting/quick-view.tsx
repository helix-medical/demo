import React from 'react';
import { Title, Grid, Paper } from '@mantine/core';
// import moment from 'moment';
// import cnf from '../../config/config';
import { useState } from 'react';
// import setNotification from '../system/errors/feedback-notif';
import ItemQuickView from './item-quick-view';
import { ISum, sum } from '../../api/accounting';

const QuickView = () => {
    // const now = moment().format(cnf.formatDate);
    // const lastMonth = moment().subtract(1, 'months').format(cnf.formatDate);
    // const lastWeek = moment().subtract(7, 'days').format(cnf.formatDate);
    // const initDate = moment('1998-12-17').format(cnf.formatDate);

    const [sumMonth, setSumMonth] = useState<ISum>(sum[0]);
    const [sumWeek, setSumWeek] = useState<ISum>(sum[1]);
    const [sumAll, setSumAll] = useState<ISum>(sum[2]);

    // useEffect(() => {
    //     const getSumMonth = async () => {
    //         try {
    //             const res = await api.get(`/accounting/sum/${lastMonth}/${now}`);
    //             setSumMonth(res.data);
    //         } catch (error: any) {
    //             if (error.response.status !== 404)
    //                 setNotification(true, `${error.message}: ${error.response.data.message}`);
    //         }
    //     };
    //     const getSumWeek = async () => {
    //         try {
    //             const res = await api.get(`/accounting/sum/${lastWeek}/${now}`);
    //             setSumWeek(res.data);
    //         } catch (error: any) {
    //             if (error.response.status !== 404)
    //                 setNotification(true, `${error.message}: ${error.response.data.message}`);
    //         }
    //     };
    //     const getSumAll = async () => {
    //         try {
    //             const res = await api.get(`/accounting/sum/${initDate}/${now}`);
    //             setSumAll(res.data);
    //         } catch (error: any) {
    //             if (error.response.status !== 404)
    //                 setNotification(true, `${error.message}: ${error.response.data.message}`);
    //         }
    //     };
    //     getSumMonth();
    //     getSumWeek();
    //     getSumAll();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
            <Title order={2}>Quick View</Title>
            <Grid columns={12} align="center" p="md">
                <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                    <ItemQuickView sum={sumMonth} name="This Month" />
                </Grid.Col>
                <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4}>
                    <ItemQuickView sum={sumWeek} name="This Week" />
                </Grid.Col>
                <Grid.Col xs={12} sm={12} md={12} lg={4} xl={4}>
                    <ItemQuickView sum={sumAll} name="All Time" />
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default QuickView;
