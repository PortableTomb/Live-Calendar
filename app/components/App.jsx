import { BrowserRouter } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import axios from 'axios';
import Main from './Main';
import React from 'react';

injectTapEventPlugin();

const App = React.createClass({
  getInitialState() {
    return {
      isLoggedIn: false
    }
  },

  authCheck() {
    axios.get('/token')
    .then((res) => {
      console.log(res.data);
      if (res) {
        this.setState({ loggedIn: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },

  signOut() {
    return axios.delete('/token')
    .catch((err) => {
      console.log(err);
    });
  },

  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <Header
              signOut={this.signOut}
              authCheck={this.authCheck}
              isLoggedIn={this.state.isLoggedIn}
            />
            <Main
              authCheck={this.authCheck}
              isLoggedIn={this.state.isLoggedIn}
            />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
});

export default App;
