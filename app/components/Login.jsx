import React from 'react';
import { white, red100, red200, red300, grey100, grey500, grey900 } from 'material-ui/styles/colors';


const styles = {
  signup: {
  },
  input: {
    padding: 10,
    display: 'block',
    margin: 'auto'
  },
  submit: {
  }
};

const Login = React.createClass({
  getInitialState() {
    return {
      email: '',
      password: ''
    }
  },

  handleSubmit(event) {
    event.preventDefault();

    return this.props.login(this.state);
  },

  handleChange(event) {
    const nextState = { [event.target.name]: event.target.value };

    this.setState(nextState);
  },
  
  handleClick(event) {
    event.preventDefault();

    return this.props.signupRender();
  },

  render() {
    return (
      <div id="login" className="offset-by-five columns">
        {/* <img id="image" className="twelve columns" src={PosterImage}/> */}
        <div className="three columns" style={styles.signup}>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="twelve columns">
                <label
                  className="six columns offset-by-three"
                  data-error="wrong"
                  data-success="right"> Email
                </label>
                <input
                  className="six columns offset-by-three"
                  id="email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />

              </div>
              <div className="twelve columns">
                <label className="six columns offset-by-three" >Password</label>
                <input
                  className="six columns offset-by-three"
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="six columns offset-by-three" ></div>
            <button
              style={styles.submit}
              className="button six columns offset-by-three"
              type="submit"
              name="action" >
              Login
            </button>
            <button
              style={styles.submit}
              className="button six columns offset-by-three btn"
              type="submit"
              onClick={this.handleClick}
              name="action" >
              Sign Up!
            </button>
          </form>
        </div>
      </div>
    );
  }
});

export default Login;
