import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Dashboard from './protected/Dashboard/Dashboard';
import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
}

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
      <FlatButton
        label="Sign Out"
        onClick={() => {
          logout();
        }}
        style={{ color: '#fff' }}
      />
    ) : (
      <span>
        <Link to="/login">
          <FlatButton label="Login" style={{ color: '#fff' }} />
        </Link>
        <Link to="/register">
          <FlatButton label="Register" style={{ color: '#fff' }} />
        </Link>
      </span>
    );
  }

  renderTopbarButtons() {
    return (
      <div>
        <Link to="/">
          <FlatButton label="Home" style={{ color: '#fff' }} />
        </Link>
        <Link to="/dashboard">
          <FlatButton label="dashboard" style={{ color: '#fff' }} />
        </Link>
        {this.renderAuthButtons()}
      </div>
    );
  }

  render() {
    return this.state.loading === true ? (
      <LinearProgress mode="indeterminate" />
    ) : (
      <BrowserRouter>
        <div className="w-100 h-100">
          <AppBar
            title="FidelizaCard"
            iconElementRight={this.renderTopbarButtons()}
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
