import React from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import { Row, Col } from 'react-bootstrap';
import { BASE_URL } from '../../constants/constant';

const ProductList = (props) => {
    const productList = props.productList?.map(product => {
        return (
            <Row>
                <Col>
                    <img src= {BASE_URL+'/'+ product.productImg} alt="product image" height ="200" />
                </Col>
                    
                <Col>
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

                <Col>
                    <div className ="productPrice">
                        Price: {product.price} Rs. /{product.quantity} {product.qtyType}
                    </div>
                </Col>

                <Col>
                    <div className ="productAvailableGroup">
                        <div className ="productAvailable">
                            Available: {product.isAvailable ? "Yes" : "No"} <span className="productAvailableSign"></span>
                        </div>
                    </div>
                </Col>

                <Col>
                    {   props.isStoreAdmin &&
                        <div className= "productEdit">
                            <PencilSquare/>
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