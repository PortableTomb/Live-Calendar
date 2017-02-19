import React from 'react';
import Show from './Show';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Shows = React.createClass({

  render() {
    return <div>
      <Card>
        <CardHeader
          title="Today's Shows"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
        {this.props.todaysEvents.map((event, index) => {
          return <div id="shows" key={index}>
                <Show
                  postEvent={this.props.postEvent}
                  event={event}

                />
          </div>
          })}
        </CardText>
        </Card>
      </div>
    }
  });

  export default Shows;
