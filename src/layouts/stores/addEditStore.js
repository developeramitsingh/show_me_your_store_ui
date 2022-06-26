import React, {useEffect, useState} from "react";
import  { useFormik } from 'formik';
import { Form, Button} from 'react-bootstrap';
import { STATE_LIST, STORE_TYPES, STORE_CATEGORY } from '../../constants/constant';
import { historyState } from '../../constants/globals';

import storeService from '../../services/storeService';

import { withRouter } from 'react-router-dom';
import userService from "../../services/userService";
import { useLocation } from "react-router-dom";


const StoreRegistration = (props)=>{
    const location = useLocation();
    const [state, setState]= useState({
        storeName: '',
        storeType: '',
        storeCategory: '',
        storeAddress: '',
        storeState: '',
        storeCity: '',
        storePhone: '',
        storePinCode: '',
        imgFile: null,
        storeImgThumb: '',
        storeId: location?.state?.editStoreId || null,
    });
    useEffect(() => {
        userService.checkDoLogin('/addEditStore');

        const getEditStore = async () => {
            try {
                if (location?.state?.editStoreId) {
                    const editStoreId = location.state.editStoreId;
                    const editStore = await storeService.getStoreById(editStoreId);

                    if (editStore && editStore.data) {
                        setState((st) => {
                            const newData = {
                                ...editStore.data,
                                storeId: editStoreId
                            }

                            delete newData.storeImg;
                            return { ...st, ...newData }
                        })
                    }
                 }
            } catch (err) {
                console.error(`error in getEditProduct: ${err}`);
            }
        }

        getEditStore();
    }, []);
    const formik = useFormik({
        initialValues: {...state },
        enableReinitialize: true,

        onSubmit: values => {
            handleSubmit(values);
        }
    })

    const goBack = ()=> {
        historyState.history.goBack();
    }

    const handleImagePreview = (e) => {
        let imageAsBase64 = URL.createObjectURL(e.target.files[0])
        let imageAsFiles = e.target.files[0];

        console.info({imageAsBase64});
        console.info({imageAsFiles});

        //formik.values.productImgThumb = imageAsBase64;
        formik.values.imgFile = imageAsFiles;
        setState((prevSt) => {
            console.info({prevSt});
            return {
                ...prevSt,
                ...formik.values,
                imagePreview: imageAsBase64,
                imgFile: imageAsFiles,
            }
        })
    }

    // Image/File Submit Handler
    const handleSubmit = (values) => {
        console.info({values});
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }
        console.info('-------calling service---->');
        //check if update case
        if (values._id) {
            console.info('-------update service---->');
            storeService.updateStore(formData);
        } else {
            console.info('-------create service---->');
            storeService.createStore(formData);
        }
        goBack();
    }

    return  (
        <div>
            <h1>Store {location?.state?.editStoreId ? 'Updation' : 'Registration'}</h1>
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
                        value = {formik.values.storePinCode}
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
                    <Form.Label>Store Phone: </Form.Label>
                    <Form.Control 
                        type = "text"
                        name = "storePhone"
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.storePhone}
                        placeholder = "Type here Store Phone Number"
                    />
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

                <Form.Group>
                    <img height="100" src={state.imagePreview || state.storeImgThumb} alt="preview store img"/>
                </Form.Group>
                <Form.Group className ="mb-3">
                    <Form.Label>Store Image: </Form.Label>
                    <Form.Control 
                        type = "file"
                        name = "storeImg"
                        onChange = {handleImagePreview}
                        onBlur = {formik.handleBlur}
                        value = {formik.values.storeImg}
                    />
                </Form.Group>

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

export default withRouter(StoreRegistration);