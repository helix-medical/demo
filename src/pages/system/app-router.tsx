import React from 'react';
import { Routes, Route } from 'react-router-dom';
// System
import Login from './login';
import Layout from './layout';
// import RequireAuth from '../../components/auth/require-auth';
// import PersistentLogin from '../../components/auth/persistent-login';
import cnf from '../../config/config';
// Pages
import Patients from '../patients';
// import Home from '../home';
// import Calendar from '../calendar';
// import EditAppointment from '../appointment/edit';
import Appointments from '../appointments';
// import ViewAppointment from '../appointment/view';
// import Accounting from '../accounting';
// Errors
import NotFound from './errors/404';
import Unauthorized from './errors/unauthorized';

const AppRouter = () => {
    const ROLES = cnf.roles;
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Public */}
                <Route path="demo/login" element={<Login />} />
                <Route path="demo/unauthorized" element={<Unauthorized />} />
                {/* Add pages for errors */}

                {/* Protected */}
                <Route>
                    {/* <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PRACTITIONER, ROLES.SECRETARY]} />}> */}
                    <Route path="demo" element={<h1>HOME</h1>} />
                    <Route path="demo/patients" element={<Patients add={false} />} />
                    <Route path="demo/patients/add" element={<Patients add={true} />} />
                    {/* <Route path="accounting" element={<Accounting />} /> */}
                    {/* <Route path="calendar" element={<Calendar />} /> */}
                    <Route path="demo/appointments">
                        <Route index element={<Appointments add={false} />} />
                        <Route path="add" element={<Appointments add={true} />} />
                        {/* <Route path=":appointmentID/view" element={<ViewAppointment />} /> */}
                        {/* </Route> */}
                    </Route>
                    {/* <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PRACTITIONER]} />}> */}
                    {/* <Route path="appointments/:appointmentID/edit" element={<EditAppointment />} /> */}
                    <Route path="demo/*" element={<NotFound />} /> {/* ?? */}
                    {/* </Route> */}
                </Route>

                {/* 404 */}
                <Route path="demo/*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
