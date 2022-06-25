import React, {useEffect, useState} from "react";
import  { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { ROLES } from '../../constants/constant';
import Multiselect from 'multiselect-react-dropdown';
import storeService from '../../services/storeService';

import { withRouter } from 'react-router-dom';
import rolesService from "../../services/rolesService";
import userService from "../../services/userService";

const AddEditUser = (props)=> {
    const [state, setState] = useState({});

    const getAllRoles = async ()=> {
        const allRoles = await rolesService.getAllRoles();

        if(allRoles) {
            const CARoleId = allRoles.data
                .filter(role => role.roleKey === ROLES.CA)?.[0]?._id;

            setState((st)=> {
                return { ...st, allRoles: allRoles.data, CARoleId }
            })
        }
    }

    const getAllStores = async ()=> {
        const allStores = await storeService.getAllStoresUnassigned( {isActive: true });

        if(allStores) {
            const storeData = allStores?.data?.map(store => ({ id: store._id, name: store.storeName }));

            setState((st)=> {
                return { ...st, allStores: storeData }
            })
        }
    }

    useEffect(() => {
        userService.checkDoLogin('/addEditUser');

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
            userService.createUser(values);
            goBack();
        },
    })

    const goBack = ()=> {
        props.history.goBack();
    }

    const handleStoreDropdown = (selectedList, selectedItem)=> {
        formik.values.stores = selectedList?.length ? selectedList.map(store => store.id)?.join(',') : '';
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

                { 
                    formik?.values?.roleId === state?.CARoleId &&
                    <Form.Group>
                        <Form.Label>Stores: </Form.Label>
                        <Multiselect
                            options={state.allStores || [] } // Options to display in the dropdown
                            selectedValues={formik.values.stores || ''} // Preselected value to persist in dropdown
                            onSelect={handleStoreDropdown} // Function will trigger on select event
                            onRemove={handleStoreDropdown} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            />
                    </Form.Group>
                }

                <Form.Group className="mt-3">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                    <Button onClick ={goBack} className ="m-2" variant="primary" type="button">
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}   

export default withRouter(AddEditUser);