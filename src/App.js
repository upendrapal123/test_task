import React from 'react';
import axios from 'axios';
import { Container, Button, Modal, Toast, ToastContainer, Alert } from 'react-bootstrap';
import Form from './Form';
import Login from './Login';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'


class App extends React.Component {
  constructor(props) {
    super(props);

    const { o } = this.props;
    this.state = {
      employeeList: [],
      editData: '',
      addData: false,
      successDelete: false,
      errorDelete: false,
      show: false,
      deleteshow: false,
      deletename: null,
      message: '',
      showToast: false


    }
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = (data) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (data) {
      this.setState({ show: false, message: data, showToast: true })
    }


    axios.get('http://localhost/restApi/api/read.php', { headers })
      .then(response => {
        this.setState({ employeeList: response.data })
      }
      );
  }

  deleteEmployee = (empoloyee) => {
    const headers = {
      'Content-Type': 'application/json'
    };

    axios.post('http://localhost/restApi/api/delete.php', { id: empoloyee.id }, headers)
      .then(response => {
        console.log(response);
        this.fetchData(); this.setState({ deleteshow: false, message: response.data })
      })
      .catch(e => this.setState({ successDelete: true }));
    setTimeout(() => {
      this.setState({ errorDelete: false, successDelete: false })
    }, 5000)
  }

  render() {
    const { employeeList, editData, addData, showToast, errorDelete, show, deleteshow, deletename, message } = this.state;
    let ids = 1;
    return (

      <div>
        <Container fluid>
          <Button variant="primary" type="submit" onClick={() => this.setState({ show: true, addData: true, editData: null })}>
            Add Employee
          </Button>
          <table>
            <thead>
              <tr>
                <td>Sr Number</td>
                <td>Name</td>
                <td>Age</td>
                <td>Email</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>

              {employeeList && employeeList.length > 0 ? employeeList.map((data, id) => {

                return (<tr key={id}>

                  <td>{ids++}</td>
                  <td>{data?.name}</td>
                  <td>{data?.age}</td>
                  <td>{data?.email}</td>
                  <td>
                    <button type="button" className="btn btn-primary" onClick={() => this.setState({ show: true, editData: data, addData: false })}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={() => this.setState({ deleteshow: true, deletename: data })}>Delete</button>
                  </td>
                </tr>);
              }) : null}
            </tbody>
          </table>


        </Container>
        <ToastContainer position='top-end'>
          <Toast onClose={() => this.setState({ showToast: false })} bg='success' show={showToast} delay={5000} autohide>
            <Toast.Header>
              <strong className="me-auto">Sucess</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>

        <Modal show={show} onHide={() => this.setState({ show: false })}>
          <Modal.Header closeButton>
            <Modal.Title> Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editData ? <Form data={editData} onSubmit={(data) => this.fetchData(data)} /> : ''}
            {addData ? <Form onSubmit={(data) => this.fetchData(data)} employeeList={employeeList} /> : ''}
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>


        <Modal show={deleteshow} onHide={() => this.setState({ deleteshow: true })}>
          <Modal.Header closeButton>
            <Modal.Title> Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you Sure to delete ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.deleteEmployee(deletename)}>
              Confirm
            </Button>
            <Button variant="primary" onClick={() => this.setState({ deleteshow: false })}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default App;
