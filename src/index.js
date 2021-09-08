import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import Register from './Register';
import reportWebVitals from './reportWebVitals';

// import { MDBInput } from "mdbreact";

import { BrowserRouter, Route, Switch } from 'react-router-dom';
// const InputPage = () => {
//   return (
//     <MDBInput label="Example label" outline size="lg" />
//   );
// }

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/employee">
          <App />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/Register">
          <Register />
        </Route>

      </Switch>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

