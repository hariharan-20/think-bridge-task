import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import './FormModal.css'

const FormModal = ({isOpen, setIsOpen, data, setData}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: '',
        price: ''
    }) 
    

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })        
    }

    useEffect(() => {
        if(data) {
            setFormData(data)
        }
    }, [data])

    const handleSubmit = (e) => {        
        e.preventDefault()

        if(e.target.outerText === 'Update') {       
            
            axios.post('http://localhost:8080/Edit', { id: formData._id, data: formData })
            .then((res) => {
                // console.log(res)
                window.alert('Update Successfull')
                handleClose()
            })
            .catch(err => {
                console.log(err)
            })            
        } else {
            axios.post('http://localhost:8080/SaveData', formData)
            .then( res => {
                // console.log(res)   
                window.alert('Added successfully')         
                handleClose()
            })
            .catch( err => {
                console.log(err)
            })
        }        
    }    

    const handleClose = () => {
        setData('')
        setFormData('')
        setIsOpen(false)
    }

    return (
        <Modal show={isOpen} onHide={handleClose}>
            <Modal.Header>
                <div style={{ display: 'flex', justifyContent:'space-between', width: '100%'}}>
                    <div className='ModalHeader'>Form Modal</div>
                    <Button className='CloseBtn' onClick={() => handleClose()}>X</Button>
                </div>
            </Modal.Header>         
            <Modal.Body>
                <div className='InputDiv'><input className='formInput' placeholder='Name' name='name' onChange={(e) => handleChange(e)} value={formData.name} /></div>
                <div className='InputDiv'><input className='formInput' placeholder='Description' name='description' onChange={(e) => handleChange(e)} value={formData.description}/></div>
                <div className='InputDiv'><input className='formInput' placeholder='Quantity' type='number' name='quantity' onChange={(e) => handleChange(e)} value={formData.quantity}/></div>
                <div className='InputDiv'><input className='formInput' placeholder='Price' name='price' onChange={(e) => handleChange(e)}  value={formData.price}/></div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(e) => handleSubmit(e)}>{data? 'Update' : 'Add'}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FormModal
