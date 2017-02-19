import React from 'react';
import User from './User';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import {black400, grey500, grey100, blue500} from 'material-ui/styles/colors';

const styles = {
  button: {
    backgroundColor: grey100,
    color: black400
  },
  chip: {
    margin: 0,
    padding: 5,
    width: 175
  },
  searchbox: {
    marginLeft: 20,
    marginBottom: 10
  },
  floatingLabelStyle: {
    fontSize: 16,
    color: blue500
  },
  floatingLabelFocusStyle: {
    color: grey100
  }
};

const Users = React.createClass({
  getInitialState() {
    return {
      searchText: ''
    }
  },

  handleClick(event) {
    event.preventDefault();

    return this.props.getUserName(this.state);
  },

  handleChange(event) {
    const nextState = { [event.target.name]: event.target.value };

    this.setState(nextState);
  },

  handleTouchTap() {
    const follow = this.props.userSearch.userId;

    return this.props.followUser(follow);
  },

  render() {
    return (

      <div id="users" style={styles.container} >
      <List>
      <div style={styles.searchbox}>
      <ListItem primaryText="Users" />
      <TextField
        name="searchText"
        value={this.state.searchText}
        onChange={this.handleChange}
        floatingLabelText="Search by Username"
        floatingLabelStyle={styles.floatingLabelStyle}
        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      />
      <FlatButton
        label="submit"
        type="submit"
        style={styles.button}
        onClick={this.handleClick}
      />
         <Chip
           style={styles.chip}
           onTouchTap={this.handleTouchTap}
          >
          {this.props.userSearch.username}
        </Chip>
      </div>
      </List>
      <Divider />
      <List>
      <ListItem primaryText="Following" />
      {this.props.following.map((user, index) => {
        return <User
          user={user}
          key={index}
          deleteFollowing={this.props.deleteFollowing}
        />
      })}
      </List>

      </div>

    );
  }
});

export default Users;
