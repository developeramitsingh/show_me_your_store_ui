import React, { useEffect, useState } from 'react'
import userService from '../../services/userService';
import productsService from '../../services/productsService';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductList from '../../components/products/productList';
import SearchBar from '../../components/search/searchBar';
import { useHistory } from "react-router-dom";

const DashboardStore = () => {
    const [state, setState] = useState({});
    const history = useHistory();

    const getAllProducts = async () => {
        try {
           const allProducts =  await productsService.getAllProducts();
           console.info({allProducts});

           if (allProducts) {
                setState((prevSt) => {
                    return {...prevSt, allProducts: allProducts.data.data }
                });
           }
        } catch (err) {
            console.error(`error in getAllProducts`, err);
        }
    }
    useEffect(() => {
        userService.checkDoLogin('/dashboardStore');

        getAllProducts();
    }, []);

    const handleEditProduct = (productId)=> {
        history.push({ pathname: '/addEditProduct', state: { editProductId:  productId } });
    }

    return (
        <>
            <Row className="right mt-2">
                <Col>
                    <Button onClick ={userService.dologout}>Logout</Button>
                </Col>
            </Row>

            <Row className="center">
                <Col>
                    <h1>Dashboard</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Link to="/addEditProduct"><Button>Add New Product</Button></Link>
                </Col>
            </Row>

            <Row>
                <Col>
                    <SearchBar setParentState ={setState} storeId ="626d86685705125ef0933934"/>
                </Col>
            </Row>

            <Row>
                <Col>
                    { 
                        state.allProducts &&
                        <ProductList productList = {state.allProducts} isStoreAdmin = {true} handleEditProduct={handleEditProduct}
                        />
                    }
                </Col>
            </Row>
        </>
    )
}

export default DashboardStore;