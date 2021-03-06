import './calendar-container.scss';
import React from 'react';
import {connect} from 'react-redux';
import EventForm from '../event-form';
import EventUpdateForm from '../event-update-form';
import EventDeleteButton from '../event-delete-button';
import Calendar from '../calendar';
import {renderIf} from '../../lib/util.js';
import {eventCreateRequest, eventReadRequest, eventUpdateRequest, eventDeleteRequest} from '../../action/event.js';

class CalendarContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      updateMode: false,
      eventToUpdate: {},
    };

    this.handleEventCreate = this.handleEventCreate.bind(this);
    this.handleEventUpdate = this.handleEventUpdate.bind(this);
    this.handleEventDelete = this.handleEventDelete.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  handleEventCreate(event){
    return this.props.eventCreate(event)
      .catch(console.error);
  }

  handleEventUpdate(event){
    this.setState({updateMode: false});
    return this.props.eventUpdate(event)
      .catch(console.error);
  }

  handleEventDelete(event){
    this.setState({updateMode: false});
    return this.props.eventDelete(event)
      .catch(console.error);
  }

  handleEventClick(event){
    this.setState({updateMode: !this.state.updateMode});
    this.setState({eventToUpdate: event});
  }

  render(){
    let handleComplete = this.props.event
      ? this.handleEventCreate
      : this.handleEventUpdate;

    return (
      <div className='calendar-container'>

        <Calendar
          handleEventClick={this.handleEventClick}
        />

        {renderIf(!this.state.updateMode,
          <EventForm
            buttonText='add event'
            onComplete={this.handleEventCreate}
          />
        )}
        {renderIf(this.state.updateMode,
          <div className='update-delete-modal'>
            <EventUpdateForm
              buttonText='update event'
              onComplete={this.handleEventUpdate}
              event={this.state.eventToUpdate}
            />

            <EventDeleteButton
              buttonText='delete event'
              onComplete={this.handleEventDelete}
              event={this.state.eventToUpdate}
            />
          </div>
        )}


      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  event: state.event,
});

let mapDispatchToProps = (dispatch) => ({
  eventCreate: (event) => dispatch(eventCreateRequest(event)),
  eventUpdate: (event) => dispatch(eventUpdateRequest(event)),
  eventDelete: (event) => dispatch(eventDeleteRequest(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);
