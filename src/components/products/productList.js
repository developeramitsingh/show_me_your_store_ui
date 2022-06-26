import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './productList.css';

const ProductList = (props) => {
    const productList = props.productList?.map(product => {
        return (
            <Row className= "mt-5 mb-5">
                <Col xl={4} lg={4} md={3} sm={12} xs={12}>
                    <img src= {product.productImg} style= {{marginTop: '0px', maxWidth: "200px"}} alt="productImg"/>
                </Col>
                    
                <Col xl={5} lg={5} md={4} sm={12} xs={12} className= "mt-1 mb-1">
                    <div className ="productGroup">
                        <div className ="productHeading">
                            Product Name: {product.productName}
                        </div>
                        {
                            product.productConpany && 
                            <div className ="productDesc">Product Company: {product.productConpany}</div>
                        }
                        {
                            product.productDesc && 
                            <div className ="productDesc">Product Description: {product.productDesc}</div>
                        }
                        {
                            product.productCategory && 
                            <div className ="productCategory">Product Category: {product.productCategory}</div>
                        }
                        {
                            product.productSize && 
                            <div className ="productSize">Product Size: {product.productSize}</div>
                        }
                    </div>
                </Col>

                <Col xl={1} lg={1} md={2} sm={12} xs={12} className= "mt-1 mb-1">
                    <div className ="productPrice">
                        Price: {product.price} Rs. /{product.quantity} {product.qtyType}
                    </div>
                </Col>

                <Col xl={1} lg={1} md={2} sm={12} xs={12} className= "mt-1 mb-1">
                    <div className ="productAvailableGroup">
                        <div className ="productAvailable">
                            Available: {product.isAvailable ? "Yes" : "No"} <span className={`productAvailableSign ${product.isAvailable ? `productExist` : `productNotExist`}`}></span>
                        </div>
                    </div>
                </Col>

                <Col xl={1} lg={1} md={1} sm={12} xs={12} className= "mt-1 mb-1">
                    {   props.isStoreAdmin &&
                        <div className= "productEdit" id= {product._id} onClick = {()=> props.handleEditProduct(product._id)}>
                            <div className="productEditBtn">Edit</div>
                        </div>
                    }
                </Col>
            </Row>
        )
    });
    return (
        <>
            {productList}
        </>
    )
}

export default ProductList;