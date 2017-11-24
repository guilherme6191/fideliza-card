import React, { Component } from 'react';
import { login, resetPassword } from '../helpers/auth';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';

function setErrorMsg(error) {
  return {
    loginMessage: error
  };
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginMessage: null,
      loading: true
    };
  }

  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    login(this.state.email, this.state.password)
      .then(() => {
        console.log(this.state);
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState(setErrorMsg('Email ou senha inválidos.'));
      });
  };
  resetPassword = () => {
    resetPassword(this.state.email)
      .then(() =>
        this.setState(
          setErrorMsg(
            `Email de restaurar senha enviado para ${this.state.email}.`
          )
        )
      )
      .catch(error => this.setState(setErrorMsg(`Email não encontrado.`)));
  };
  render() {
    return this.state.loading ? (
      <LinearProgress mode="indeterminate" style={style.progress} />
    ) : (
      <form
        style={style.container}
        onSubmit={event => {
          this.handleSubmit(event);
        }}
      >
        <h3>Login</h3>
        <TextField
          hintText="Digite seu email"
          floatingLabelText="Email"
          onChange={(event, newValue) => this.setState({ email: newValue })}
        />
        <br />
        <TextField
          type="password"
          hintText="Digite sua senha"
          floatingLabelText="Password"
          onChange={(event, newValue) => this.setState({ password: newValue })}
        />
        <br />
        {this.state.loginMessage && (
          <div className="alert alert-danger" role="alert">
            <span
              className="glyphicon glyphicon-exclamation-sign"
              aria-hidden="true"
            />
            <span className="sr-only">Error:</span>
            &nbsp;{this.state.loginMessage}{' '}
            <a
              href="#"
              onClick={this.resetPassword}
              className="alert-link small"
            >
              Esqueceu a senha?
            </a>
          </div>
        )}
        <RaisedButton
          label="Login"
          primary={true}
          style={style.raisedBtn}
          type="submit"
        />
      </form>
    );
  }
}

const raisedBtn = {
  margin: 15
};

const container = {
  textAlign: 'center'
};

const progress = {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0
};

const style = {
  raisedBtn,
  container,
  progress
};
