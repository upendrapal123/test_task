import React from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Button, Form, Row, Container, Alert } from 'react-bootstrap';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class Login extends React.Component {
    constructor(props) {
        super(props);
        const { data } = this.props;
        console.log("thiss", this.props);
        this.state = {


            email: '',
            password: '',

            id: data?.id,
            successAdd: false,
            errorAdd: false,
            successEdit: false,
            errorEdit: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };
        const { email, password } = this.state;
        if (!email || !password) {
            return;
        }
        const { onSubmit } = this.props;
        const data = { email: email, password: password };
        axios.post('http://localhost/restApi/api/login.php', data, headers)
            .then(response => {
                console.log(response, "fdfdfdf");
                this.setState({
                    successAdd: true
                })
                console.log(response.data);
                onSubmit(response.data);
            })
            .catch(e => this.setState({ errorAdd: true }))


    }

    render() {
        console.log(this.state, "dffddfdf");
        const { successAdd, successEdit, id, errorAdd, errorEdit, email, password } = this.state;
        return (
            <Container>
                {successAdd ? <Alert key={"addemp"} variant="success">
                    Login Successfully
                </Alert> : ''}
                {successEdit ? <Alert key={"addemp"} variant="success">
                    Username password  Incorrect
                </Alert> : ''}
                {errorAdd ? <Alert key={"addemp"} variant="success">
                    Username password Incorrect
                </Alert> : ''}
                {errorEdit ? <Alert key={"addemp"} variant="success">
                    Username notvaild
                </Alert> : ''}
                <MDBContainer>
                    <MDBRow>


                        <MDBCol md="6">
                            <form>
                                <p className="h5 text-center mb-4">Sign in</p>
                                <div className="grey-text">
                                    <MDBInput label="Type your email" value={email} onChange={(e) => this.handleChange(e)} name="email" icon="envelope" group type="email" validate error="wrong"
                                        success="right" outline />
                                    <MDBInput label="Type your password" icon="lock" value={password} onChange={(e) => this.handleChange(e)} name="password" outline group type="password" validate />
                                </div>
                                <div className="text-center">
                                    <Button variant="primary" type="submit" onClick={(e) => this.handleSubmit(e)}>
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                {/* <Row>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address: </Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => this.handleChange(e)} name="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control type="password" value={email} onChange={(e) => this.handleChange(e)} name="password" placeholder="password" />
                        </Form.Group>


                        <Button variant="primary" type="submit" onClick={(e) => this.handleSubmit(e)}>
                            {id ? 'Update' : 'Login'}
                        </Button>
                    </Form>
                </Row> */}
            </Container >
        );
    }
}

export default Login;