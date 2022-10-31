import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import IExpenseData from '../../models/IExpenseData';
import { postDataToServer } from '../../services/server';

type Props = {
    closeAction: () => any
};

type FormData = Omit<IExpenseData, "id">;

type ErrorObject = {
    payeeName: string,
    product: string,
    price: string
}

const AddNewForm = ( { closeAction } : Props ) => {

    const [ formData, setFormData ] = useState<FormData>({
        payeeName: '',
        product: '',
        price: 0,
        transactionDate: (new Date()).toISOString().slice(0, 10)
    });

    const [ errFormData, setErrFormData ] = useState<ErrorObject>({
        payeeName: 'error',
        product: 'error',
        price: 'error'
    });

    const [ formValidity, setFormValidity ] = useState<boolean>(false);

    const validateForm = () => {
        if( errFormData.payeeName !== '' && errFormData.price !== '' && errFormData.product !== '' ) {
            setFormValidity(false);
        } else {
            setFormValidity(true);
        }
    };

    const changeHandler = ( event : any ) => {
        const value = event.target.value;
        const field = event.target.id;

        if( field === 'price' ) {
            const intValue = parseInt(value);
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

        setErrFormData({
            ...errFormData,
            [field]: ''
        })

        validateForm();
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
        closeAction();
    };
  
    return ( 
        <Modal show={true} onHide={closeAction} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="payeeName">
                        <Form.Label>Payee</Form.Label>
                        <Form.Select 
                            onChange={changeHandler}
                        >
                            <option value="">...</option>
                            <option value="Anurag Jaisingh">Anurag Jaisingh</option>
                            <option value="Vishal Jain">Vishal Jain</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="product">
                        <Form.Label>Product Purchased</Form.Label>
                        <Form.Control type="text" value={formData.product} onChange={changeHandler} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Expense in Rupees (₹)</Form.Label>
                        <Form.Control type="text" value={formData.price} onChange={changeHandler} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="transactionDate">
                        <Form.Label>Transaction Date</Form.Label>
                        <Form.Control type="date" value={formData.transactionDate} onChange={changeHandler} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={closeAction}>
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