import React, { useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router'
import './Login.css'


const Login = () => {
    const [auth, setAuth] = useState({
        name: '',
        pass: ''
    })
    const history = useHistory()


    const handleChange = (e) => {
        setAuth({
            ...auth, 
            [e.target.name]: e.target.value
        })        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(auth.name === 'admin' && auth.pass === 'admin') {
            history.push('/dashboard')
        } else {
            window.alert('invalid credentials')
        }        
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Row className= 'fomrRow'>
                    <Col md={6}><label>Username</label></Col>
                    <Col md={6}>
                        <input name='name' value={auth.name} className='form-input' onChange={(e) => handleChange(e)} />
                    </Col>
                </Row>
                <Row className= 'fomrRow'>
                    <Col md={6}><label>password</label></Col>
                    <Col md={6}>
                        <input type='password' name='pass' value={auth.pass} className='form-input' onChange={(e) => handleChange(e)} />
                    </Col>
                </Row >
                <Row className= 'BtnRow'><Button type='submit'>Login</Button></Row>
            </form>
        </Container>
    )
}

export default Login