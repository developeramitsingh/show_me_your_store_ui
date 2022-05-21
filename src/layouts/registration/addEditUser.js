import React, {useEffect, useState} from "react";
import  { useFormik } from 'formik';
import { Form, Button, CloseButton} from 'react-bootstrap';
import { STATE_LIST, STORE_TYPES, STORE_CATEGORY, ROLES } from '../../constants/constant';


import storeService from '../../services/storeService';

import { withRouter } from 'react-router-dom';
import rolesService from "../../services/rolesService";
import userService from "../../services/userService";

const AddEditUser = (props)=> {
    const [state, setState] = useState({});

    const getAllRoles = async ()=> {
        const allRoles = await rolesService.getAllRoles();

        console.info({allRoles});

        if(allRoles) {
            setState((st)=> {
                return { ...st, allRoles: allRoles.data }
            })
        }

        console.info({state});
    }

    const getAllStores = async ()=> {
        const allStores = await storeService.getAllStores();

        console.info({allStores});

        if(allStores) {
            setState((st)=> {
                return { ...st, allStores: allStores.data }
            })
        }

        console.info({state});
    }

    useEffect(() => {
        let activeUserRole = userService.getRoleKey();

        if (activeUserRole && activeUserRole === ROLES.SA) {
            console.info(activeUserRole);
        } else {
            props.history.push('/login')
        }

        getAllRoles();
        getAllStores();
    }, []);


    const formik = useFormik({
        initialValues: {
            roleId: '',
            stores: '',
            userName: '',
            email: '',
            mobile: '',
            password: '',
        },

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
            storeService.createStore(values);
        }
    })

    const handleCancel = ()=> {
        props.history.goBack();
    }

    return  (
        <div>
            <h1>User Registration</h1>
            <Form onSubmit ={formik.handleSubmit} className="mt-4">
            <Form.Group>
                    <Form.Label>Role: </Form.Label>
                    <Form.Select 
                        name = "roleId"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.roleId}
                    >
                        {
                            state.allRoles && state.allRoles.map(type => (
                                <option value={type._id}>{ type.roleName }</option>
                            ))
                        }
                    </Form.Select> 
                </Form.Group>

                <Form.Group className ="mb-3">
                    <Form.Label>User Name: </Form.Label>
                    <Form.Control 
                        type = "text"
                        name = "userName"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.userName}
                        placeholder = "Type here User name"
                    />
                </Form.Group>
                

                <Form.Group className ="mb-3">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control 
                        type = "text"
                        name = "email"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.email}
                        placeholder = "Type here email"
                    />

                    <Form.Label>Mobile: </Form.Label>
                    <Form.Control 
                        type = "text"
                        name = "mobile"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.mobile}
                        placeholder = "Type here mobile"
                    />

                    <Form.Label>Password: </Form.Label>
                    <Form.Control 
                        type = "password"
                        name = "password"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.password}
                        placeholder = "Type here password"
                    />

                    <Form.Label>Retype Password: </Form.Label>
                    <Form.Control 
                        type = "password"
                        name = "retypePassword"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.retypePassword}
                        placeholder = "Type here password again"
                    /> 
                </Form.Group>
                

                <Form.Group>
                    <Form.Label>Stores: </Form.Label>
                    <Form.Select 
                        name = "stores"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.stores}
                    >
                        {
                            state.allStores && state.allStores.map(cat => (
                                <option value={cat._id}>{ cat.storeName }</option>
                            ))
                        }
                    </Form.Select> 
                </Form.Group>

                <Form.Group className="mt-3">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                    <Button onClick ={handleCancel} className ="m-2" variant="primary" type="button">
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default withRouter(AddEditUser);