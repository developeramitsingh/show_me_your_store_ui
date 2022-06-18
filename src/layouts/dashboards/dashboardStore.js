import React, { useEffect, useState } from 'react'
import userService from '../../services/userService';
import productsService from '../../services/productsService';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductList from '../../components/products/productList';
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
            <Button onClick ={userService.dologout}>Logout</Button>
            <h1>Dashboard</h1>
            <Link to="/addEditProduct"><Button>Add New Product</Button></Link>
            { 
              state.allProducts && <ProductList productList ={state.allProducts} isStoreAdmin = {true} handleEditProduct={handleEditProduct}/>
            }
        </>
    )
}

export default DashboardStore;