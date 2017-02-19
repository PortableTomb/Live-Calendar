import Day from './Day';
import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Days = React.createClass({

  render() {
    return (

      <div> <Card>
        <CardHeader
          title="Today's Shows"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          {this.props.todaysEvents.map((event, index) => {
            return <div id="shows" key={index}>
              <Day
                postEvent={this.props.postEvent}
                event={event}
              />
            </div>
          })}
        </CardText>
      </Card>

    </div>

  );
}
});

export default Days;
