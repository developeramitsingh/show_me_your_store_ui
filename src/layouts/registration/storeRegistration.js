import React, {useEffect} from "react";
import  { useFormik } from 'formik';
import { Form, Button} from 'react-bootstrap';
import { STATE_LIST, STORE_TYPES, STORE_CATEGORY, ROLES } from '../../constants/constant';


import storeService from '../../services/storeService';

import { withRouter } from 'react-router-dom';
import userService from "../../services/userService";


const StoreRegistration = (props)=>{
    useEffect(() => {
        userService.checkDoLogin('/storeRegistration');
    }, []);
    const formik = useFormik({
        initialValues: {
            storeName: '',
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
            <h1>Store Registration</h1>
            <Form onSubmit ={formik.handleSubmit} className="mt-4">
                <Form.Group className ="mb-3">
                    <Form.Label>Store Name: </Form.Label>
                    <Form.Control 
                        type = "text"
                        name = "storeName"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.storeName}
                        placeholder = "Type here store name"
                    />
                </Form.Group>
                

                <Form.Group className ="mb-3">
                    <Form.Label>Store Address: </Form.Label>
                    <Form.Control 
                        type = "text"
                        name = "storeAddress"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.storeAddress}
                        placeholder = "Type here store address"
                    />

                    <Form.Label>Store City: </Form.Label>
                    <Form.Control 
                        type = "text"
                        name = "storeCity"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.storeCity}
                        placeholder = "Type here store city"
                    />

                    <Form.Label>Pin Code: </Form.Label>
                    <Form.Control 
                        type = "text"
                        name = "storePinCode"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.pinCode}
                        placeholder = "Type here store pin code"
                    />

                    <Form.Label>Store State: </Form.Label>
                    <Form.Select 
                        name = "storeState"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.storeState}
                    >
                        {
                            STATE_LIST.map(state => (<option value={state}>{state}</option>))
                        }
                    </Form.Select> 
                </Form.Group>
                <Form.Group>
                    <Form.Label>Store Type: </Form.Label>
                    <Form.Select 
                        name = "storeType"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.storeType}
                    >
                        {
                            STORE_TYPES.map(type => (
                                <option value={type.value}>{ type.label }</option>
                            ))
                        }
                    </Form.Select> 
                </Form.Group>

                <Form.Group>
                    <Form.Label>Store Category: </Form.Label>
                    <Form.Select 
                        name = "storeCategory"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.storeCategory}
                    >
                        {
                            STORE_CATEGORY.map(cat => (
                                <option value={cat.value}>{ cat.label }</option>
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

export default withRouter(StoreRegistration);