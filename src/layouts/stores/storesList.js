import { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import ControllerHelper from '../../helpers/controllerHelper';
import { useHistory } from "react-router-dom";
import userService from '../../services/userService';

const StoresList = () => {
    const [state, setState] = useState({});
    const history = useHistory();

    const allStores = async () => {
        const allStores = await ControllerHelper.getAllStores();
        console.info({allStores});

        setState((prev) => {
            return { ...prev, allStores: allStores?.data || [] }
        })
    }
    useEffect(()=> {
        allStores();
    }, [])

    const handleClick = (e)=> {
        e.preventDefault();
        const id = e.target.id;
        const name = e.target.name;
        if (name === 'goToDashboard') {
            history.push({
                pathname: '/dashboardStore',
                state: { storeId: id }
            })
        } else if(name === 'editStore') {
            history.push({
                pathname: '/addEditStore',
                state: { editStoreId: id }
            })
        }
    }

    return (
        <>
            <Row className="mt-2 mb-2">
                <Col className="right">
                    <div style={{ float: 'right'}}>
                        <Button onClick ={userService.dologout}>Logout</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex">
                    {
                        state.allStores && state.allStores.map(store => {
                            return (
                                <Card id={store._id} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={store.storeImgThumb} />
                                    <Card.Body>
                                        <Card.Title>{store.storeName}</Card.Title>
                                        <Card.Text>
                                            <div>Store Type: {store.storeType}</div>
                                            <div>Store Category: {store.storeCategory}</div>
                                            <div>Address: {store.storeAddress}</div>
                                            <div>City: {store.storeCity}</div>
                                            <div>Phone: {store.storePhone}</div>
                                            <div>Active: {store.isActive}</div>
                                        </Card.Text>
                                        <div className='d-flex justify-content-between'>
                                            <Button variant="primary" name="goToDashboard" id={store._id} onClick={handleClick}>Go to Dashboard</Button>

                                            <Button variant="primary" name="editStore" id={store._id} onClick={handleClick}>Edit Store</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </Col>
            </Row>
        </>
    );
}

export default StoresList;