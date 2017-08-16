import React from 'react';
import BigCalendar from 'react-big-calendar';
import {connect} from 'react-redux';
import {eventCreateRequest, eventReadRequest} from '../../action/event.js';
// import events from './events/events.js';
import moment from 'moment';

let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k]);
console.log('views', BigCalendar.views);

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);


let Basic = React.createClass({

  componentWillMount(){
    this.props.eventRead();
  },

  // componentWillReceiveProps(props){
  //   if(props.event){
  //     this.setState({...state, ...props.event})
  //   }
  // },
  //
  // shouldComponentUpdate(nextProps, nextState){
  //
  // },

  render(){
    console.log('props', this.props);
    return (
      <BigCalendar
        {...this.props}
        selectable
        events={this.props.events}
        views={allViews}
        defaultView='week'
        defaultDate={new Date()}
        onSelectEvent={event => this.props.handleEventClick(event)}
        onSelectSlot={(slotInfo) => alert(
          `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
          `\nend: ${slotInfo.end.toLocaleString()}`
        )}
      />
    );
  },
});

let mapStateToProps = (state) => ({
  events: state.events,
});

let mapDispatchToProps = (dispatch) => ({
  eventRead: () => dispatch(eventReadRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basic);
