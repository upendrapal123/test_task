import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBIcon,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter
} from "mdbreact";

class Register extends React.Component {

    render() {
        // return <>vvvv</>;
        return (
            <>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                            <form>
                                <p className="h5 text-center mb-4">Write to us</p>
                                <div className="grey-text">
                                    <MDBInput
                                        label="Your name"
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        outline
                                    />
                                </div>
                                <div className="text-center">
                                    <button>App</button>
                                    {/* <MDBBtn outline color="secondary">
                                        Send
                                    </MDBBtn> */}
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    }
}






export default Register;