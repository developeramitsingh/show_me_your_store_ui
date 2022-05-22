import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import userService from '../../services/userService';
import productsService from '../../services/productsService';
import { Button } from 'react-bootstrap';
import ProductList from '../../components/products/productList';

const DashboardStore = (props) => {
    const [state, setState] = useState({});

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
    return (
        <>
            <Button onClick ={userService.dologout}>Logout</Button>
            <h1>Dashboard</h1>
            { 
              state.allProducts && <ProductList productList ={state.allProducts} isStoreAdmin = {true}/>
            }
        </>
    )
}

export default withRouter(DashboardStore);