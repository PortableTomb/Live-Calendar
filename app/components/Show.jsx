import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Show = React.createClass({
  handleClickGoing() {
    const event = this.props.event;
    const goingEventData = {
      going: true,
      maybe: false,
      artistName: event.artist,
      venueName: event.venue,
      eventDate: event.start,
      eventId: event.id
    };

    return this.props.postEvent(goingEventData);
  },

  handleClickMaybe() {
    const event = this.props.event;
    const maybeEventData = {
      going: false,
      maybe: true,
      artistName: event.artist,
      venueName: event.venue,
      eventDate: event.start,
      eventId: event.id
    };

    return this.props.postEvent(maybeEventData);
  },

  render() {
    return (

        <div id="show">
        <Card>
        <CardHeader
          title={this.props.event.artist}
          subtitle={this.props.event.venue}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
        <div className="card-content black-text">
        <div className="card-action">
          <FlatButton
          label="Tickets"
          href={this.props.event.ticketUrl}
        />
        </div>
          <div className="date-time-title">{this.props.event.date}</div>
        </div>

        </CardText>
        <CardActions>

        <FlatButton
          className="go-button"
          label="Going"
          name="Going"
          value={this.props.event}
          onClick={this.handleClickGoing}
        />
        <FlatButton
          className="maybe-button"
          label="Maybe"
          name="Maybe"
          value={this.props.event}
          onClick={this.handleClickMaybe}
        />

        </CardActions>
        </Card>
        </div>

    );
  }
});

export default Show;

{/* <div className="card white">
  <div className="card-show-date">21</div>
  <div className="card-content black-text">
    <span className="band-title">Band Names</span>
    <hr />
    <span className="venue-title">Venue Name</span>
    <span className="date-time-title">11/28/16 9:00PM</span>
  </div>
  <div>
    <span className="going-title">Going </span>
    <span className="going-title">Maybe</span>
  </div>
  <div className="card-action">
    <button className="ticket-link flat-btn">Tickets</button>
  </div>
   <div>

  </div>
</div> */}
