import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom';
import IExpenseData from '../../models/IExpenseData';
import { postDataToServer } from '../../services/server';
import './AddNewForm.css';

type FormData = Omit<IExpenseData, "id">;

const AddNewForm = () => {

    let history = useHistory();

    const navigateBack = () => {
        history.push("/");
    };

    const [ formData, setFormData ] = useState<FormData>({
        payeeName: '',
        product: '',
        price: 0,
        transactionDate: (new Date()).toISOString().slice(0, 10)
    });

    const [ formValidity, setFormValidity ] = useState<boolean>(false);

    useEffect( () => {
        if( formData.payeeName === '' || formData.price < 1 || formData.product === '' ) {
            setFormValidity(false);
        } else {
            setFormValidity(true);
        }
    }, [formData] );

    const changeHandler = ( event : any ) => {
        const value = event.target.value;
        const field = event.target.id;

        if( field === 'price' ) {
            let intValue;
            if( value === '' ){
                intValue = 0;
            } else {
                intValue = parseInt(value);
            }
            setFormData({
                ...formData,
                [field]: intValue
            });
        } else {
            setFormData({
                ...formData,
                [field]: value
            });
        }
    };

    const submitHandler = async ( event : any ) => {
        event.preventDefault();
        const data = await postDataToServer(formData);
        console.log(`Added Data: ${data}`);
        setFormData({
            payeeName: '',
            product: '',
            price: 0,
            transactionDate: (new Date()).toISOString().slice(0, 10)
        });
        navigateBack();
    };
  
    return ( 
        <Modal show={true} onHide={navigateBack} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="payeeName">
                        <Form.Label>Payee</Form.Label>
                        <Form.Select 
                            onChange={changeHandler}
                            required
                        >
                            <option value="">...</option>
                            <option value="Anurag Jaisingh">Anurag Jaisingh</option>
                            <option value="Vishal Jain">Vishal Jain</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="product">
                        <Form.Label>Product Purchased</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={formData.product} 
                            onChange={changeHandler} 
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Expense in Rupees (₹)</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={formData.price} 
                            onChange={changeHandler} 
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="transactionDate">
                        <Form.Label>Transaction Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            value={formData.transactionDate} 
                            onChange={changeHandler} 
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={navigateBack}>
                    Close
                </Button>
                <Button 
                    variant="primary" 
                    type="submit" 
                    onClick={submitHandler}
                    disabled={formValidity ? false : true}
                >
                    Save Expense
                </Button>
            </Modal.Footer>
        </Modal>
     );
}
 
export default AddNewForm;