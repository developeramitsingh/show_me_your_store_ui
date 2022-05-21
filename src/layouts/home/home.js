import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from "react";
const home = () => {
    return (
        <>  
            <h1>Home</h1>
            <Link to="/login"><Button>Login</Button></Link>
        </>
    )
}

export default home;