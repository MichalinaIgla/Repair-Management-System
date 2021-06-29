import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import React from 'react';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeOutlinedIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: <AssignmentTurnedInOutlinedIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Employees',
        path: '/employees',
        icon: <PeopleAltOutlinedIcon />,
        cName: 'nav-text'
    },

]