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
        const user = userService.getUser();
        setState(prev => {
            return { ...prev, ...user};
        })
        allStores();
    }, [])

    const handleClick = (e)=> {        
        const id = e.target.id;
        const name = e.target.getAttribute('name');

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
                    <div className="d-flex justify-content-end">
                        { state.userName &&
                         <div>Welcome {state.userName}</div>
                        }
                        <div>
                            <Button onClick= {userService.dologout}>Logout</Button>
                        </div>
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
                                            <div>Available: {store.isActive ? 'Yes' : 'No'}</div>
                                        </Card.Text>
                                        <Row>
                                            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                                <div className="primary-btn" name="goToDashboard" id={store._id} onClick={handleClick}>Go to Dashboard</div>
                                            </Col>

                                            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                                <div className="primary-btn" name="editStore" id={store._id} onClick={handleClick}>Edit Store</div>
                                            </Col>
                                        </Row>
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