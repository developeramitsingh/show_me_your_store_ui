import React, { useEffect } from "react";
import  { useFormik } from 'formik';
import { Form, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import userService from '../../services/userService';
import {ROLES} from '../../constants/constant';


const Login = (props)=>{
    useEffect(()=> {
        const roleKey = userService.getRoleKey();
        console.info({roleKey})
        if (roleKey === ROLES.SA) {
            props.history.push('/dashboardSA');
        } else if (roleKey === ROLES.CA) {
            props.history.push('/storesList');
        } else if (roleKey === ROLES.UA) {
            props.history.push('/dashboard');
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            mobile: '',
            password: '',
        },

        onSubmit: async values => {
            //alert(JSON.stringify(values, null, 2))
            try {
                const data = await userService.login(values);

                if (data.data.success) {
                    const user = userService.doAfterLogin(data.data.token);

                    //alert(JSON.stringify(user, null, 2));
                    if (user.roleId.roleKey === ROLES.CA) {
                        props.history.push('/storesList');
                    } else if (user.roleId.roleKey === ROLES.UA) {
                        props.history.push('/dashboard');
                    } else if (user.roleId.roleKey === ROLES.SA) {
                        props.history.push('/dashboardSA');
                    } else {
                        props.history.push('/login');
                        localStorage.clear();
                    }
                }
            } catch(err) {
                console.info(err);
                alert(`message: ${err}`)
            }
        }
    })

    return  (
        <div>
            <h1>Login</h1>
            <Form onSubmit ={formik.handleSubmit} className="mt-4">
                <Form.Group className ="mb-3">
                    <Form.Label>Mobile: </Form.Label>
                    <Form.Control 
                        type = "text"
                        name = "mobile"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.mobile}
                        placeholder = "Type your registered mobile number"
                    />
                </Form.Group>
                

                <Form.Group className ="mb-3">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control 
                        type = "password"
                        name = "password"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.password}
                        placeholder = "Type your password"
                    />
                </Form.Group>                

                <Form.Group className="mt-3">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default withRouter(Login);