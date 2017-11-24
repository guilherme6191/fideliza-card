import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Switch } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Dashboard from './protected/Dashboard/Dashboard';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';

import './index.css';

export default class App extends Component {
  state = {
    authed: false,
    loading: true
  };
  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        });
      } else {
        this.setState({
          authed: false,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  renderAuthButtons(props) {
    return this.state.authed ? (
      <span>
        <Link to="/dashboard">
          <FlatButton label="dashboard" style={{ color: '#fff' }} />
        </Link>
        <FlatButton
          label="Sair"
          onClick={() => {
            logout();
          }}
          style={{ color: '#fff' }}
        />
      </span>
    ) : (
      <span>
        <Link to="/login">
          <FlatButton label="Entrar" style={{ color: '#fff' }} />
        </Link>
        <Link to="/register">
          <FlatButton label="Registrar" style={{ color: '#fff' }} />
        </Link>
      </span>
    );
  }

  renderTopbarButtons() {
    return <div>{this.renderAuthButtons()}</div>;
  }

  render() {
    return this.state.loading === true ? (
      <LinearProgress mode="indeterminate" />
    ) : (
      <BrowserRouter>
        <div className="">
          <AppBar
            title={
              <Link to="/" className="home-link" style={{ color: '#fff' }}>
                Fideliza Card
              </Link>
            }
            iconElementRight={this.renderTopbarButtons()}
            iconElementLeft={<div />}
            iconStyleRight={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '0'
            }}
          />
          <div className="w-100 h-100">
            <Switch>
              <Route path="/" exact component={Home} />
              <PublicRoute
                authed={this.state.authed}
                path="/login"
                component={Login}
              />
              <PublicRoute
                authed={this.state.authed}
                path="/register"
                component={Register}
              />
              <PrivateRoute
                authed={this.state.authed}
                path="/dashboard"
                component={Dashboard}
              />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
