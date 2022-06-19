import { useRef, useState } from 'react';
import { Form, Row, Col  } from 'react-bootstrap';
import { Search, MicFill, ArrowClockwise } from 'react-bootstrap-icons';
import productsService from '../../services/productsService';
import './searchBar.css';

const debounce = (func, delay)=> {
    let debounceHandler;

    return function (val) {
        clearTimeout(debounceHandler);

        debounceHandler = setTimeout(async () => {
            func(val);
        }, delay);
    }
}

const SearchBar = (props)=> {
    const [state, setState] = useState({
        value: '',
    });
    const fetchData = async (val) => {
        const searchedProducts = await productsService.searchProduct(props.storeId, val);

        props.setParentState(prev => {
            return { ...prev, allProducts: searchedProducts?.data || [] };
        })
    };

    let debouncedFetch = useRef(debounce(fetchData, 500)).current;

    const handleChange = async (e) => {
        const val = e?.target?.value;

        setState(prev => {
            return { ...prev, value: val }
        })
        debouncedFetch(val);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        debouncedFetch(state.value);
    }
    return (
        <>
            <Row className="mt-4">
                <Col lg={9} md={9} sm={9} xs ={9}>
                    <Form onSubmit ={handleSubmit}>
                        <Form.Control 
                            type = "text"
                            name = "searchBox"
                            onChange = {handleChange}
                            value = {state.value}
                            placeholder = "Search here product"
                        />
                    </Form>
                </Col>
                <Col lg ={1} md= {1} sm ={1} xs={1}>
                    <Search className = "cursorPointer" onClick ={()=> fetchData(state.value)} size={40} />
                </Col>
                <Col lg={1} md= {1} sm ={1} xs ={1}>
                    <MicFill className = "cursorPointer"  size ={40}/>
                </Col>
                <Col lg ={1} md= {1} sm ={1} xs={1}>
                    <ArrowClockwise className = "cursorPointer" onClick ={()=> fetchData('')} size={40} />
                </Col>
            </Row>
        </>
    )
}

export default SearchBar;