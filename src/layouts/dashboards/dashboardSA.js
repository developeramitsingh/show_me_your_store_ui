import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ROLES } from '../../constants/constant';
import { withRouter } from 'react-router-dom';
import userService from '../../services/userService';

const DashboardSA = (props) => {
    useEffect(() => {
        userService.checkDoLogin('/dashboardSA');
    }, []);
    return (
        <>
            <h1>Dashboard SA</h1>
            <Link to="/addEditStore"><Button>Register Store</Button></Link>
            <Link to="/addEditUser"><Button>Create User</Button></Link>
            <Button onClick ={userService.dologout}>Logout</Button>
        </>
    )
}

export default withRouter(DashboardSA)