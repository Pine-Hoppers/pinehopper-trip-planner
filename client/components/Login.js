import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { Link } from 'react-router-dom';

// COMPONENT
const LoginForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="auth-div">
      <div id="auth-image"></div>
      <div id="auth-form-section">
        <h2>LOG IN</h2>
        <form className="auth-form" onSubmit={handleSubmit} name={name}>
          <div>
            <input name="username" placeholder="Username" type="text" />
          </div>
          <div>
            <input name="password" placeholder="Password" type="password" />
          </div>
          <div>
            <button className="auth-btn" type="submit">
              {displayName}
            </button>
          </div>
          {error && error.response && (
            <div id="login-error-msg"> {error.response.data} </div>
          )}
        </form>
        <p>
          Don't have an account?{' '}
          <Link className="auth-links" to="/signup">
            Sign Up Here
          </Link>
        </p>
      </div>
    </div>
  );
};

// CONTAINER
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(LoginForm);
