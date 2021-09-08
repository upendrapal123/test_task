import React from 'react';
import axios from 'axios';
import { Button, Form, Row, Container, Alert } from 'react-bootstrap';

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    console.log("thiss", this.props);
    this.state = {
      name: data?.name,
      age: data?.age,
      email: data?.email,
      designation: data?.designation,
      id: data?.id,
      successAdd: false,
      errorAdd: false,
      successEdit: false,
      errorEdit: false,
      alreadyExist: false
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
      'Content-Type': 'application/json'
    };
    const { name, age, email, designation, id } = this.state;
    if (!name || !age || !email || !designation) {
      return;
    }
    const { onSubmit, employeeList } = this.props;
    const eamilarr = email.split("@");
    var newEmail = eamilarr[0].toLowerCase() + "@" + eamilarr[1];
    console.log(newEmail);
    if (id) {
      const data = { id: id, name: name, email: email.toLowerCase(), age: age, designation: designation, created: new Date() };
      axios.post('http://localhost/restApi/api/update.php', data, headers)
        .then(response => {


          this.setState({
            successEdit: true
          })
          onSubmit(response.data);
        })
        .catch(e => this.setState({ errorEdit: true }));

    } else {
      const data = { name: name, email: email.toLowerCase(), age: age, designation: designation, created: new Date() };
      const employeeListData = employeeList.filter(data => data.email == email.toLowerCase());
      if (employeeListData && employeeListData.length > 0) {
        this.setState({ alreadyExist: true });
        setTimeout(() => {
          this.setState({ alreadyExist: false, successEdit: false })
        }, 8000)

        return;
      }
      axios.post('http://localhost/restApi/api/create.php', data, headers)
        .then(response => {
          this.setState({
            successAdd: true
          })
          console.log(response.data);
          onSubmit(response.data);
        })
        .catch(e => this.setState({ errorAdd: true }))

    }
    setTimeout(() => {
      this.setState({ errorEdit: false, successEdit: false })
    }, 8000)

  }

  render() {
    // console.log(this.state, "dffddfdf");
    const { name, age, successAdd, successEdit, id, alreadyExist, errorAdd, errorEdit, email, designation } = this.state;
    return (
      <Container>
        {successAdd ? <Alert key={"addemp"} variant="success">
          Employee Added Successfully
        </Alert> : ''}
        {successEdit ? <Alert key={"addemp"} variant="success">
          Employee Updated Successfully
        </Alert> : ''}
        {errorAdd ? <Alert key={"addemp"} variant="success">
          Employee not added.
        </Alert> : ''}
        {errorEdit ? <Alert key={"addemp"} variant="success">
          Employee not updated.
        </Alert> : ''}
        {alreadyExist ? <Alert key={"addemp"} variant="danger">
          Email already exist. Please try with other eother mail.
        </Alert> : ''}
        <Row>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name: </Form.Label>
              <Form.Control onChange={(e) => this.handleChange(e)} type="text" value={name} name="name" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address: </Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => this.handleChange(e)} name="email" placeholder="Enter email" pattern='/[a-z]/' />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age: </Form.Label>
              <Form.Control type="number" value={age} name="age" placeholder="Age" required onChange={(e) => this.handleChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Designation: </Form.Label>
              <Form.Control onChange={(e) => this.handleChange(e)} type="text" value={designation} name="designation" placeholder="Designation" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => this.handleSubmit(e)}>
              {id ? 'Update' : 'Submit'}
            </Button>
          </Form>
        </Row>
      </Container >
    );
  }
}

export default EmployeeForm;