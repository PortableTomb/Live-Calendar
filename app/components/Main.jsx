// import { BrowserRouter } from 'react-router';
import { Match } from 'react-router';
import Calendar from './Calendar';
import axios from 'axios';
import Auth from './Auth';
import React from 'react';
import Redirect from 'react-router/Redirect'
import UserDash from './UserDash';
import moment from 'moment';

const Main = React.createClass({
  getInitialState() {
    return {
      events: [],
      todaysEvents: [],
      following: [],
      going: [],
      attended: [],
      maybe: [],
      userSearch: [],
      loggedIn: false,
      loadErr: false
    }
  },

  componentDidMount() {
    this.setState({ open: false, open1: false })
    axios.get('/events')
    .then((res) => {

      const events = res.data.Events;

      let newEvents = [];
      let todaysEvents = [];
      let date = moment().format();

      for (let i = 0; i < events.length; i++) {
        const stringDate = date.toString();
        const exactDate = stringDate.substring(0, stringDate.indexOf('T'));

        const stringEventDate = events[i].Date.toString();
        const exactEventDate = stringEventDate.substring(0, stringEventDate.indexOf('T'));

        const singleEvent = {
          id: events[i].Id,
          title: `${events[i].Artists[0].Name} @ ${events[i].Venue.Name}`,
          artist: events[i].Artists[0].Name,
          venue: events[i].Venue.Name,
          ticketUrl: events[i].TicketUrl,
          venueUrl: events[i].Venue.Url,
          allDay: true,
          date: exactEventDate,
          start: events[i].Date
        };

        if (singleEvent.date === exactDate) {
          todaysEvents.push(singleEvent);
        }

        newEvents.push(singleEvent);
      }

      this.setState({ events: newEvents, todaysEvents: todaysEvents });
    })
    .catch((err) => {
      this.setState({loadErr: err});
    });

    return this.props.authCheck();
  },

  postEvent(event) {
    axios.post('/events', event)
    .then((res) => {
      console.log('Event Posted!');
    })
    .catch((err) => {
      console.log(err);
    });
  },

  getFollowing() {
    axios.get('/followingList')
    .then((res) => {

      this.setState({ following: res.data })
    })
    .catch((err) => {
      console.log(err);
    });
  },

  deleteFollowing(followingId) {
    axios.delete('/relationships', { data: { followingId } })
    .then((res) => {
      this.getFollowing();
    })
    .catch((err) => {
      console.log(err);
    });
  },

  getUserName(name) {
    const username = { username: name };
    axios.post('/username', username)
    .then((res) => {

      this.setState({ userSearch: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
  },

  followUser(follow) {
    axios.post('/relationships', { data: { follow } })
    .then((res) => {

      this.getFollowing();
      this.setState({ userSearch: [], open: true });
    })
    .catch((err) => {
      console.log(err);
    });
  },

  getAttendeesGoing(eventId) {
    return axios.post('/attendeesGoing', eventId)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },

  getAttendeesMaybe(eventId) {
    return axios.post('/attendeesMaybe', eventId)
    .then((res) => {

      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },

  getGoing() {
    axios.get('/going')
    .then((res) => {
      const goingEvents = res.data;

      Promise.all(goingEvents.map((event) => {

        return Promise.all([
          this.getAttendeesGoing({ eventId: event.eventId }),
          this.getAttendeesMaybe({ eventId: event.eventId })
        ])
        .then((arr) => {
          return Object.assign({}, event, { attendeesGoing: arr[0], attendeesMaybe: arr[1] });
        })
        .catch((err) => {
          console.log(err);
        });
      }))
      .then((events) => {
        let pastEvents = [];
        let comingEvents = [];
        let date = moment().format();

        for (let i = 0; i < events.length; i++) {
          const stringDate = date.toString();
          const exactDate = stringDate.substring(0, stringDate.indexOf('T'));

          const stringEventDate = events[i].eventDate.toString();
          const exactEventDate = stringEventDate.substring(0, stringEventDate.indexOf('T'));

          const event = Object.assign({}, events[i], {exactDate: exactEventDate });

          if (event.exactEventDate < exactDate) {

            pastEvents.push(event);
          }
          else {

            comingEvents.push(event);
          }
        }

        this.setState({ going: comingEvents, attended: pastEvents });
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  },

  getMaybe() {
    axios.get('/maybe')
    .then((res) => {
      const eventArr = res.data;

      Promise.all(eventArr.map((event) => {

        return Promise.all([
          this.getAttendeesGoing({ eventId: event.eventId }),
          this.getAttendeesMaybe({ eventId: event.eventId })
        ])
        .then((arr) => {
          return Object.assign({}, event, { attendeesGoing: arr[0], attendeesMaybe: arr[1] });
        })
        .catch((err) => {
          console.log(err);
        });
      }))
      .then((maybeEvents) => {
        const events = [];
        for (let i = 0; i < maybeEvents.length; i++) {
          const stringEventDate = maybeEvents[i].eventDate.toString();
          const exactEventDate = stringEventDate.substring(0, stringEventDate.indexOf('T'));

          const event = Object.assign({}, maybeEvents[i],{ exactDate: exactEventDate })

          events.push(event);
        }

        this.setState({ maybe: events });
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  },

  render() {
    return (
      <div>
        <Match pattern="/Calendar" exactly render={
          () => (
            this.props.isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Calendar
                events={this.state.events}
                postEvent={this.postEvent}
                todaysEvents={this.state.todaysEvents}
              />)
            )}
          />
          <Match pattern="/" exactly render={
            () =>
            <Auth
              signup={this.userSignup}
            />
          }
        />
        <Match pattern="/UserDash" exactly render={
          () => (
            this.props.isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <UserDash
                authCheck={this.props.authCheck}
                going={this.state.going}
                maybe={this.state.maybe}
                attended={this.state.attended}
                getGoing={this.getGoing}
                getMaybe={this.getMaybe}
                getUserName={this.getUserName}
                following={this.state.following}
                getFollowing={this.getFollowing}
                deleteFollowing={this.deleteFollowing}
                userSearch={this.state.userSearch}
                followUser={this.followUser}
              />)
            )}
          />
        </div>
      );
    }
  });

  export default Main;
