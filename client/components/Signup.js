import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { Link } from 'react-router-dom';

// COMPONENT
const SignupForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="auth-div">
      <div id="auth-image"></div>
      <div id="auth-form-section">
        <h2>SIGN UP</h2>
        <form className="auth-form" onSubmit={handleSubmit} name={name}>
          <div>
            <input
              name="firstName"
              placeholder="First Name *"
              type="text"
              required
            />
          </div>
          <div>
            <input
              name="lastName"
              placeholder="Last Name *"
              type="text"
              required
            />
          </div>
          <div>
            <input name="email" placeholder="Email *" type="email" required />
          </div>
          <div>
            <input
              name="username"
              placeholder="Username *"
              type="text"
              required
            />
          </div>
          <div>
            <input
              name="password"
              placeholder="Password *"
              type="password"
              required
            />
          </div>
          <div>
            <button className="auth-btn" type="submit">
              {displayName}
            </button>
          </div>
          {error && error.response && (
            <div id="signup-error-msg"> {error.response.data} </div>
          )}
        </form>
        <p>
          Already have an account?{' '}
          <Link className="auth-links" to="/login">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

// CONTAINER
const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(
        authenticate(username, password, formName, firstName, lastName, email)
      );
    },
  };
};

export const Signup = connect(mapSignup, mapDispatch)(SignupForm);
