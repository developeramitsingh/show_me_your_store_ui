import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { ROLES } from '../../constants/constant';
import userService from '../../services/userService';

const DashboardStore = (props) => {
    useEffect(() => {
        let activeUserRole = userService.getRoleKey();

        if (activeUserRole && activeUserRole === ROLES.CA) {
        } else {
            props.history.push('/login')
        }
    }, []);
    return (
        <>
            <h1>Dashboard</h1>
        </>
    )
}

export default withRouter(DashboardStore);