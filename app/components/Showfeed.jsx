import React from 'react';
import Shows from './Shows';

const styles= {
  text: {
    textAlign: 'left'
  }
};

const Showfeed = React.createClass({

  render() {
    return (

      <div id="Showfeed">
        <Shows
          postEvent={this.props.postEvent}
          todaysEvents={this.props.todaysEvents}
          styles={styles.text}
       />

      </div>

    );
  }
});

export default Showfeed;
