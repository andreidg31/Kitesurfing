import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import AuthRoute from './components/routes/AuthRoute';
import PrivateRoute from './components/routes/PrivateRoute';
import Dashboard from "./components/views/Dashboard";
import Login from "./components/views/Login";
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <AuthRoute path="/login" component={Login} />
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals