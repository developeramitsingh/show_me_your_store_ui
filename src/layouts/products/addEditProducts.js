import React, { useEffect, useState } from "react";
import  { useFormik } from 'formik';
import { Form, Button, Row, Col  } from 'react-bootstrap';

import productsService from '../../services/productsService';
import { historyState } from '../../constants/globals';
import userService from "../../services/userService";
import storeService from "../../services/storeService";
import Multiselect from 'multiselect-react-dropdown';

const AddEditProducts = () => {
    const [state, setState] = useState({
        storeId: ""
    });

    const getAllStoresOfUser = async () => {
        const storeIds = userService.getUserStoreIds();

        console.info({storeIds});

        const allStores = await storeService.getAllStores({
            "_id": storeIds
        })

        console.info({allStores});

        if (allStores && allStores.data) {
            setState((prevSt) => {
                return {
                    ...prevSt,
                    allStores: allStores.data.map(store => ({ id: store._id, name: store.storeName }))
                }
            })
        }
    }

    useEffect(() => {
        userService.checkDoLogin('/addEditProducts');
        getAllStoresOfUser();
    }, []);

    const formik = useFormik({
        initialValues: {
            storeId: '',
            productName: '',
            productCompany: '',
            productDesc: '',
            productCategory: '',
            warranty: '',
            price: '',
            imgFile: null,
            qtyType: '',
            quantity: '',
            size: '',
            imagePreview:'',
        },

        onSubmit: values => {
            handleSubmitFile(values);
        },
    })

    const handleCancel = ()=> {
        historyState.history.goBack();
    }

    const handleImagePreview = (e) => {
        let imageAsBase64 = URL.createObjectURL(e.target.files[0])
        let imageAsFiles = e.target.files[0];

        console.info({imageAsBase64});
        console.info({imageAsFiles});

        //formik.values.imagePreview = imageAsBase64;
        formik.values.imgFile = imageAsFiles;
        setState((prevSt) => {
            return {
                ...prevSt,
                imagePreview: imageAsBase64,
                //imgFile: imageAsFiles,
            }
        })
    }

    // Image/File Submit Handler
    const handleSubmitFile = (values) => {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }

        console.info({formData})

        productsService.createProducts(formData);
    }

    const handleStoreDropdown = (selectedList, selectedItem)=> {
        console.info('formik values', formik.values)
        formik.values.storeId = selectedList?.length ? selectedList.map(store => store.id)?.join(',') : '';
        console.info({selectedList});
        console.info({selectedItem});
    }

    return (
        <>
            <Row>
                <Col>
                    <h1>Add New Products</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit ={formik.handleSubmit} className="mt-4">
                        <Form.Group>
                            <Form.Label>Stores: </Form.Label>
                            <Multiselect
                                options={state.allStores} // Options to display in the dropdown
                                selectedValues={state.storeId} // Preselected value to persist in dropdown
                                onSelect={handleStoreDropdown} // Function will trigger on select event
                                onRemove={handleStoreDropdown} // Function will trigger on remove event
                                displayValue="name" // Property name to display in the dropdown options
                                />
                        </Form.Group>
                        <Form.Group className ="mb-3">
                            <Form.Label>Product Name: </Form.Label>
                            <Form.Control 
                                type = "text"
                                name = "productName"
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.productName}
                                placeholder = "Type here product name"
                            />
                        </Form.Group>

                        <Form.Group className ="mb-3">
                            <Form.Label>Product Company: </Form.Label>
                            <Form.Control 
                                type = "text"
                                name = "productCompany"
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.productCompany}
                                placeholder = "Type here product description"
                            />
                        </Form.Group>

                        <Form.Group className ="mb-3">
                            <Form.Label>Product Description: </Form.Label>
                            <Form.Control 
                                type = "text"
                                name = "productDesc"
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.productDesc}
                                placeholder = "Type here product description"
                            />
                        </Form.Group>

                        <Form.Group className ="mb-3">
                            <Form.Label>Product Category: </Form.Label>
                            <Form.Control 
                                type = "text"
                                name = "productCategory"
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.Category}
                                placeholder = "Type here product category"
                            />
                        </Form.Group>

                        <Form.Group className ="mb-3">
                            <Form.Label>price: </Form.Label>
                            <Form.Control 
                                type = "text"
                                name = "price"
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.price}
                                placeholder = "Type here product price"
                            />
                        </Form.Group>

                        <Form.Group className ="mb-3">
                            <Form.Label>Quantity Type: </Form.Label>
                            <Form.Control 
                                type = "text"
                                name = "qtyType"
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.qtyType}
                                placeholder = "Type here product quantity type"
                            />
                        </Form.Group>

                        <Form.Group className ="mb-3">
                            <Form.Label>Quantity: </Form.Label>
                            <Form.Control 
                                type = "text"
                                name = "quantity"
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.quantity}
                                placeholder = "Type here product quantity"
                            />
                        </Form.Group>

                        <Form.Group className ="mb-3">
                            <Form.Label>Size: </Form.Label>
                            <Form.Control 
                                type = "text"
                                name = "size"
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.size}
                                placeholder = "Type here product size"
                            />
                        </Form.Group>

                        <Form.Group className ="mb-3">
                            <Form.Label>Warranty: </Form.Label>
                            <Form.Control 
                                type = "text"
                                name = "warranty"
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.warranty}
                                placeholder = "Type here product warranty"
                            />
                        </Form.Group>

                        <Form.Group>
                            <img height="100" src={state.imagePreview} alt="image preview"/>
                        </Form.Group>
                        <Form.Group className ="mb-3">
                            <Form.Label>Product Image: </Form.Label>
                            <Form.Control 
                                type = "file"
                                name = "productImg"
                                onChange = {handleImagePreview}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.productImg}
                            />
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
                </Col>
            </Row>
        </>
    )
}

export default AddEditProducts;