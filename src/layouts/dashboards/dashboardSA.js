import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ROLES } from '../../constants/constant';
import { withRouter } from 'react-router-dom';
import userService from '../../services/userService';

const DashboardSA = (props) => {
    useEffect(() => {
        let activeUserRole = userService.getRoleKey();

        if (activeUserRole && activeUserRole === ROLES.SA) {

        } else {
            props.history.push('/login')
        }
    }, []);
    return (
        <>
            <h1>Dashboard SA</h1>
            <Link to="/storeRegistration"><Button>Register Store</Button></Link>
            <Link to="/addEditUser"><Button>Create User</Button></Link>
        </>
    )
}

export default withRouter(DashboardSA)