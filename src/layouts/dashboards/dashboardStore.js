import React, { useEffect, useState } from 'react'
import userService from '../../services/userService';
import productsService from '../../services/productsService';
import { Row, Col, Button } from 'react-bootstrap';
import ProductList from '../../components/products/productList';
import SearchBar from '../../components/search/searchBar';
import { useHistory, useLocation, Link } from "react-router-dom";

const DashboardStore = () => {
    const location = useLocation();

    const [state, setState] = useState({
        storeId: location?.state?.storeId,
    });

    const [storeId, setStoreId] = useState(null);
    const history = useHistory();


    const getAllProducts = async () => {
        try {
           console.info('getAllPrdict', storeId);
           if(!storeId) {
               return;
           }
           const allProducts =  await productsService.getAllProductsByQuery({storeId });
           console.info('here----->', {allProducts});

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

        console.info({iiii: location?.state?.storeId})
        setStoreId(() => location?.state?.storeId);

        getAllProducts();
    }, [storeId, location?.state?.storeId]);

    const handleEditProduct = (productId)=> {
        history.push({ pathname: '/addEditProduct', state: { editProductId:  productId } });
    }

    return (
        <>
            <Row className="mt-2">
                <Col className="right">
                    <div style={{ float: 'right'}}>
                        <Button style= {{marginRight: '10px'}} onClick ={()=> history.push('/storesList')}>Go Back</Button>
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
                    <Link to="/addEditProduct"><Button>Add New Product</Button></Link>
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
                        <ProductList productList = {state.allProducts} isStoreAdmin = {true} handleEditProduct={handleEditProduct}
                        />
                    }
                </Col>
            </Row>
        </>
    )
}

export default DashboardStore;