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

        history.push({
            pathname: '/dashboardStore',
            state: { storeId: id }
        })
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
                                <Card id={store._id} onClick={handleClick} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={store.storeImg} />
                                    <Card.Body>
                                        <Card.Title>{store.storeName}</Card.Title>
                                        <Card.Text>
                                            <div>Address: {store.storeAddress}</div>
                                            <div>City: {store.city}</div>
                                            <div>Active: {store.isActive}</div>
                                        </Card.Text>
                                        <Button variant="primary" id={store._id} onClick={handleClick}>Go to Store</Button>
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