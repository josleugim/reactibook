import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';
import { withRouter } from 'react-router';
import Login from "./authentication/Login";
import '../styles/App.scss';
import Header from "./common/Header";
import Wall from "./wall/Wall";

function App() {
  return (
    <div className="App columns">
        <div className="column">
            <Header/>
            <div className="main-wrapper">
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/" component={Wall} />
                </Switch>
            </div>
        </div>
    </div>
  );
}

export default withRouter(App);
