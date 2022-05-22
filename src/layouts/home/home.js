import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useEffect } from "react";
import userService from '../../services/userService';
import {ROLES} from '../../constants/constant';
import {withRouter} from 'react-router-dom';

const Home = (props) => {
    useEffect(()=> {
        const roleKey = userService.getRoleKey();
        if (roleKey === ROLES.SA) {
            props.history.push('/dashboardSA');
        } else if (roleKey === ROLES.CA) {
            props.history.push('/dashboardStore');
        } else if (roleKey === ROLES.UA) {
            props.history.push('/dashboard');
        }
    }, []);

    return (
        <>  
            <h1>Home</h1>
            <Link to="/login"><Button>Login</Button></Link>
        </>
    )
}

export default withRouter(Home);