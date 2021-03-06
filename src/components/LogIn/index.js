import React from 'react';
import { connect } from 'react-redux';

import classes from './style.module.css';


class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }
  
  handleChangeInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const { login, password } = this.state;
    this.props.dispatch({
      type: 'TRY_LOG_IN',
      payload: {
        login,
        password
      }
    });
    this.setState({
      login: '',
      password: '',
    });
  }
  
  componentDidUpdate(prevProps) {
    const { auth } = this.props;
    if (auth.isAuthorized !== prevProps.auth.isAuthorized) {
      auth.isAuthorized && window.history.back();
    }
  }
  
  render() {
    const { login, password } = this.state;
    return (
      //auth.name ? <Redirect to='/' /> :
      <form onSubmit={ this.handleSubmit } className={ classes.form }>
        <input type='text' name='login' placeholder='Login*' value={ login } onChange={this.handleChangeInput} required />
        <input type='password' name='password' placeholder='Password*' value={ password } onChange={this.handleChangeInput} required />
        <input type='submit' value='Log In' />
      </form>
    )
  }
}

const mapStateToProps = state => (
  { auth: state.auth }
)

export default connect(mapStateToProps)(LogIn);