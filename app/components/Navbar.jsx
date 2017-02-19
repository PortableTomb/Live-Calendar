// Router
import { Link, Match } from 'react-router';
import Auth from './Auth';
import Calendar from './Main';
// UI
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {black400, grey500, grey100, grey900
} from 'material-ui/styles/colors';

const Navbar = React.createClass({
  getInitialState() {
    return {
      logged: true
    }
  },

  handleClick() {
    this.props.signOut();
  },

  render() {
    const styles = {
      navbar:  {
        backgroundColor: grey900
      }
    };

    class Login extends Component {
      static muiName= 'FlatButton';

      render() {
        return (
          <FlatButton {...this.props} label="Login" />
        );
      }
    }

    const Logged = (props) => (
      <div>
        <IconMenu
          {...props}
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <Link to="/"><MenuItem primaryText="Login" /></Link>
            <Link to="/Calendar"><MenuItem primaryText="Calendar" /></Link>
            <Link to="/UserDash"><MenuItem primaryText="Dashboard" /></Link>
            <Link to="/"><MenuItem primaryText="Sign Out" onClick={this.handleClick} /></Link>

          </IconMenu>
        </div>
      );

      Logged.muiName = 'IconMenu';

      return (
        <div id="navbar">
          <AppBar
            style={styles.navbar}
            title="Live! Music Calendar"
            iconElementRight={this.state.logged ? <Logged /> : <Login />}
          />
        </div>
      );
    }
  });

  export default Navbar;
