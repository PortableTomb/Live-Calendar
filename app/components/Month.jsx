import Days from './Days';
import Shows from './Shows';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

BigCalendar.momentLocalizer(moment);

const Month = React.createClass({
  getInitialState() {
    return {
      open: false,
      date: null,
      currentDayEvents: []
    };
  },

  filterEvents() {
    let propEvents = this.props.events;
    let dayEventsArr = [];
    for (let i = 0; i < propEvents.length; i++) {
      if (propEvents[i].date === this.state.date) {
        dayEventsArr.push(propEvents[i]);
      }
    }

    this.setState({ currentDayEvents: dayEventsArr });
  },

  handleOpen() {
    this.setState({open: true});
  },

  handleClose() {
    this.setState({open: false});
  },

  handleSelectSlot(obj) {
    const newDate = moment(obj.start).format();
    const stringDate = newDate.toString();
    const exactDate = stringDate.substring(0, stringDate.indexOf('T'));

    this.setState({ date: exactDate });
    this.handleOpen();
    this.filterEvents();
  },

  render() {
    return (

      <div id="month">
        <BigCalendar
          defaultDate={new Date()}
          defaultView="month"
          endAccessor="endDate"
          events={this.props.events}
          onSelectSlot={this.handleSelectSlot}
          selectable={true}
          startAccessor="startDate"
          step={15}
          timeslots={8}
          views={['month']}
        />


        <div>
          <Dialog
            title="Dialog With Actions"
            modal={false}
            open={this.state.open}
            autoScrollBodyContent={true}
            onRequestClose={this.handleClose}
            >
              <Days
                postEvent={this.props.postEvent}
                todaysEvents={this.state.currentDayEvents}/>
              </Dialog>
            </div>
          </div>

        );
      }
    });

    export default Month;
