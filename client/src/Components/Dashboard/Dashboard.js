import React, {useEffect , useState} from 'react'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './Dashboard.css'
import FormModal from '../Modal/FormModal'
import {GrEdit} from 'react-icons/gr'
import {RiDeleteBin6Fill} from 'react-icons/ri' 

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState()
    const [EditData, setEditData] = useState()

    const getData = async () => await axios.get('http://localhost:8080/GetAll')
        .then( res => {
            console.log(res)
            setData(res.data.data)
        })
        .catch( err => {
            console.log(err)
        })

    const DelData = async (id) => await axios.post('http://localhost:8080/Delete', {id: id})
        .then( res => {
            console.log(res)
            getData()
        })
        .catch( err => {
            console.log(err)
        })    

    const handleEdit =(e, id) => {
        const foundData = data.find(ele => ele._id === id)
        setEditData(foundData)
        setIsOpen(true)                
    }

    const handleDel =(e, id) => {
        DelData(id)        
    }

    useEffect(() => {
        getData()
    }, [isOpen])

    return (        
        <div className='Dashboard'>
            <div className='title'>Think Bridge Inventory</div>
            <Container fluid>
                <Row>
                    <Col md={1} className='RowHeader'>S.No</Col>
                    <Col md={2} className='RowHeader'>Name</Col>
                    <Col md={3} className='RowHeader'>Description</Col>
                    <Col md={1} className='RowHeader'>Qty</Col>
                    <Col md={2} className='RowHeader'>Price</Col>
                    <Col md={2} className='RowHeader'>Total</Col>
                    <Col md={1}></Col>
                </Row>
        {data ? data.map((ele, i) => {
            return (
                <Row key={i}>
                    <Col md={1} className='RowData'>{i+1}</Col>
                    <Col md={2} className='RowData'>{ele.name}</Col>
                    <Col md={3} className='RowData'>{ele.description}</Col>
                    <Col md={1} className='RowData'>{ele.quantity}</Col>
                    <Col md={2} className='RowData'>{ele.price}</Col>
                    <Col md={2} className='RowData'>{ele.price}</Col>
                    <Col md={1} className='ButtonDiv'>
                        <Button className='ActionBtn' onClick={(e) => handleEdit(e, ele._id)}><GrEdit /></Button>
                        <Button className='ActionBtn' onClick={(e) => handleDel(e, ele._id)}><RiDeleteBin6Fill /></Button>
                    </Col>
                </Row>
             )
        }) :    <Row>Loading...</Row>
        }                
                <Row className='BtnDiv'>
                    <Button className='AddBtn' onClick={() => setIsOpen(true)}>Add</Button>
                </Row>
            </Container>
        <FormModal isOpen={isOpen} setIsOpen={setIsOpen} data={EditData} setData={setEditData}/>
        </div>
    )
}

export default Dashboard