import React from 'react';
import { white, red100, red200, red300, grey100, grey500, grey900 } from 'material-ui/styles/colors';

const styles = {
  signup: {
    // position: 'relative',
    // height: '50%',
    // lineHeight: '50%',
    // backgroundColor: red100,
    // borderRadius: 10,
    // margin: 'auto',
    // color: red200
  },
  input: {
    padding: 10,
    display: 'block',
    margin: 'auto'
  },
  submit: {
    // display: 'block',
    // backgroundColor: red200,
    // color: red300
  }
};

const Signup = React.createClass({
  getInitialState() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    }
  },

  handleSubmit(event) {
    event.preventDefault();
    return this.props.signup(this.state);
  },

  handleChange(event) {
    const nextState = { [event.target.name]: event.target.value };

    this.setState(nextState);
  },

  handleClick(event) {
    event.preventDefault();

    return this.props.loginRender();
  },

  render() {
    return (

      <div id="sign-up" className="offset-by-four columns">
        <div className="four columns sign" style={styles.signup}>

          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div
                className="twelve columns sign"
                style={styles.input}>
                <label className="six columns offset-by-three">First Name</label>
                <input
                  className="input-field six columns offset-by-three"
                  id="first_name"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  name="firstName"
                />
              </div>
              <div className="twelve columns sign">
                <label className="six columns offset-by-three">Last Name</label>
                <input
                  className="input-field six columns offset-by-three"
                  id="last_name"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                  name="lastName"
                />

              </div>
              <div className="twelve columns sign">
                <label className="six columns offset-by-three">Username</label>
                <input
                  className="input-field six columns offset-by-three"
                  id="username"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.username}
                  name="username"
                />

              </div>
            </div>
            <div className="row">

              <div className="twelve columns sign">
                <label className="six columns offset-by-three">Email</label>
                <input
                  className="input-field six columns offset-by-three"
                  id="email"
                  type="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  name="email"
                />

              </div>

              <div className="twelve columns sign">
                <label className="six columns offset-by-three">Password</label>
                <input
                  className="input-field six columns offset-by-three"
                  id="password"
                  type="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  name="password"
                />
              </div>
            <div className="six columns offset-by-three" ></div>
            <button
              style={styles.submit}
              className="button six columns offset-by-three"
              type="submit"
              name="action" >
              Submit
            </button>
            <button
              style={styles.submit}
              className="button six columns offset-by-three backto"
              type="submit"
              onClick={this.handleClick}
              name="action" >
              Back to Login
            </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

export default Signup;
