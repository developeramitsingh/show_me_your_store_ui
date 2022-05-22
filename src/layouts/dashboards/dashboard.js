import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import userService from '../../services/userService';
import { Button } from 'react-bootstrap';

const Dashboard = (props) => {
    useEffect(() => {
        userService.checkDoLogin('/dashboard');

    }, []);
    return (
        <>
            <h1>Dashboard</h1>
            <Button onClick ={userService.dologout}>Logout</Button>
        </>
    )
}

export default withRouter(Dashboard);