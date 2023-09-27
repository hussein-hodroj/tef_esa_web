import React from 'react'
import './Reservations.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SidebarAdmin from './SidebarAdmin.js';
import NavbarAdmin from './NavbarAdmin.js';


const localizer = momentLocalizer(moment);


function Reservations() {
    const [booking, setBooking] = useState([]);

  
    const [selectedEvent, setSelectedEvent] = useState(null);

    // function eventPropGetter(event, start, end, isSelected) {  
      
    //    var style=  {
    //       backgroundColor:'yellow',
    //       borderRadius: '5px',
    //       opacity: 0.8,
    //       color: 'white',
    //       border: 'none',
    //       display: 'block',
    //     }; 
    //    return{
    //     style : style
    //    }
    // }
   

    useEffect(() => {
      axios
        .get(`http://localhost:8000/register/`)
        .then((response) => setBooking(response.data))
        .catch((error) => console.log(error));
    }, []);

  function handleEventSelect(event) {
    setSelectedEvent(event);
  }

  function handleClosePopup() {
    setSelectedEvent(null);
  }

  function getEventPopup() {
    if (!selectedEvent) {
      return null;
    }

    

    return (
      <div>
        <div className='flex'>
     <div className="h-full w-full ml-56 mt-14 mb-10 ">
      <div className="p-6 gap-4">
      <div className="event-popup-overlay">
        <div className="event-popup">
          <button className="close-btn" onClick={handleClosePopup}>
            &times;
          </button>
          <h2 > {`${selectedEvent.FirstName} ${selectedEvent.LastName}`}</h2>  <br/>
          <p >
            <strong >Exam:</strong> {selectedEvent.title }
          </p>
          <p >
            <strong >Currency:</strong> {selectedEvent.Currency}
          </p>
          <p >
            <strong >Fees:</strong> {selectedEvent.fees}
          </p>
          <p >
            <strong >Date:</strong>{' '}
            {moment(selectedEvent.formattedDate).format('YYYY-MM-DD')}
          </p>
          
           <p >
            <strong >Phone Number:</strong> {selectedEvent.Phone}
          </p>
          <p >
            <strong >Email:</strong> {selectedEvent.Email}
          </p>
          <p >
            <strong >Nationality:</strong> {selectedEvent.Nationality}
          </p>
          
          <div class="button-container">
      <button className="btn btn-primary py-1 px-3 d-flex justify-content-center items-center text-center">
      <strong > More </strong>
      </button>
    </div>
         
        </div>
       
      
      </div>
      </div></div></div></div>
    );
  }

  
   
 
  function tileContent({ BookDate, view }) {
    if (view === 'month') {
        const formattedDate = moment(BookDate).format('D MMM');
        const eventData = booking.find(event => moment(event.BookDate).format('D MMM') === formattedDate);
        return eventData ? eventData.someProperty : null;
    } else {
        return null;
    }
}
const formats = {
    timeGutterFormat: '',
     agendaTimeFormat: '',
  };

  return (
    <div>
         <NavbarAdmin/>
        <div className='d-flex'>
        <SidebarAdmin/>


    <div className='container m-3'>
    

        <h1 className='title_home'>Reservations</h1>
    <div className='calendar_container'>
      <Calendar
        localizer={localizer}
        events={booking}
        startAccessor={(event) => moment(event.BookDate).toDate()}
        endAccessor={(event) => moment(event.BookDate).toDate()}
        titleAccessor={(event) => `${event.FirstName} ${event.LastName}`}
        style={{ height: '100vh'}}
        selectable={true}
        popup={true}
        onSelectEvent={handleEventSelect}
        views={['month', 'week', 'day', 'agenda']}
        formats={formats}

        //   showTimes={false}
        //   toolbar.time={false} 

      />
    </div>
    {getEventPopup()}
  </div> 
     
   </div> 
  </div>
);
}

export default Reservations;