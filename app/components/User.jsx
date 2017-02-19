import React from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 0,
    padding: 5,
    width: 175
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

const User = React.createClass({
  handleRequestDelete() {
    const followingId = this.props.user.id;

    this.props.deleteFollowing(followingId);
  },

  handleTouchTap() {
    alert('Do you mind?');
  },

  render() {
    return (

      <div id="user">
       <div style={styles.wrapper}>
       <List>
        <ListItem>
          <Chip
          onRequestDelete={this.handleRequestDelete}
          onTouchTap={this.handleTouchTap}
          style={styles.chip}
          >

          {this.props.user.username}
          </Chip>

        </ListItem>
      </List>
      </div>
    </div>

    );
  }
});

export default User;
