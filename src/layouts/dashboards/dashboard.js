import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import userService from '../../services/userService';
import productsService from '../../services/productsService';
import { Row, Col, Button } from 'react-bootstrap';
import ProductList from '../../components/products/productList';
import SearchBar from '../../components/search/searchBar';
import { useLocation } from "react-router-dom";

const Dashboard = (props) => {
    const location = useLocation();

    const [state, setState] = useState({
        storeId: location?.state?.storeId,
    });

    const [storeId, setStoreId] = useState(null);


    const getAllProducts = async () => {
        try {
           console.info('getAllPrdict', storeId);
           if(!storeId) {
               return;
           }
           const allProducts =  await productsService.getAllProductsByQuery({ storeId });
           console.info('here----->', { allProducts });

           if (allProducts) {
                setState((prevSt) => {
                    return {...prevSt, allProducts: allProducts?.data?.data || [] }
                });
           }
        } catch (err) {
            console.error(`error in getAllProducts`, err);
        }
    }
    useEffect(() => {
        setStoreId(() => location?.state?.storeId || new URLSearchParams(location.search).get('storeId'));

        getAllProducts();
    }, [storeId, location?.state?.storeId]);

    return (
        <>
            <Row className="mt-2">
                <Col className="right">
                    <div style={{ float: 'right'}}>
                        <Button onClick ={userService.dologout}>Logout</Button>
                    </div>
                </Col>
            </Row>

            <Row className="center">
                <Col>
                    <h1>Dashboard</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                {console.info({storeId}, 'dd-???????')}
                    <SearchBar setParentState ={setState} storeId ={storeId}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    { 
                        state.allProducts &&
                        <ProductList productList = {state.allProducts}/>
                    }
                </Col>
            </Row>
        </>
    )
}

export default withRouter(Dashboard);