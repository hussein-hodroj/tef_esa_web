import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import {  useNavigate } from 'react-router-dom';
import './Calendar.css';
import Calendar from 'react-calendar';
import Axios from 'axios';
import Header from '../pages/Header.js';
import Footer from '../pages/Footer.js';

const isSameDay = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const TEFEtudes = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [infoid, setinfoid] = useState(null); 
  const [title, settitle] = useState(null);
  const [type, settype] = useState(null); 
  const [isBookNowDisabled, setIsBookNowDisabled] = useState(true);
  const [Currency, setCurrency] = useState(null);
  const [calendarDates, setCalendarDates] = useState([]);
  
  const navigate = useNavigate();
  const [fees, setFees] = useState(null); 

  const [date, setdate] = useState(null);

  
  const [disabledDates, setDisabledDates] = useState([]);
  useEffect(() => {
   
    Axios.get('http://localhost:8000/TEFEtudes/TEFEtudes') 
      .then((response) => {
        const dates = response.data.map((dateStr) => new Date(dateStr.date));
        setFees(response.data[0].fees); 
        setCurrency(response.data[0].Currency);
        setinfoid(response.data[0].infoid);
        settype(response.data[0].type);
        settitle(response.data[0].title); 
        setCalendarDates(dates); 
        console.log("++++++++++",dates)
      })
      .catch((error) => {
        console.error('Error fetching fees data:', error);
      });

      
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:8000/TEFCanada/TEFCanada-date')
      .then((response) => {
        const disabledDates = response.data.map((item) => new Date(item.day));
        setDisabledDates(disabledDates);
        setdate(response.data);
      })
      .catch((error) => {
        console.error('Error fetching fees data:', error);
      });
  }, []);

  useEffect(() => {
    console.log('***********', date);
  }, [date]);
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setBookedDates([...bookedDates, date]);

    setIsBookNowDisabled(false);
  };

  const handleButtonClick = () => {
    navigate('/');
  };

  const handleBookNow = () => {
    if (selectedDate ) {
      const queryParams = `date=${selectedDate.toISOString()}
      &fees=${fees}&infoid=${infoid}&Currency=${Currency}&title=${title}&type=${type}`;
      navigate(`/register?${queryParams}`);
    } else {
      alert('You have to choose at least one test to book a time.');
    }
  };

  // const tileDisabled = ({ date, view }) => {
  //   if (view === 'month') {
     
  //     return !disabledDates.some((disabledDate) => {
  //       return (
  //         date.getDate() === disabledDate.getDate() &&
  //         date.getMonth() === disabledDate.getMonth() &&
  //         date.getFullYear() === disabledDate.getFullYear()
  //       );
  //     });
  //   }
  //   return false;
  // };
  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
  
      const currentDate = new Date();
      const timeDifference = date.getTime() - currentDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  
      return (
        daysDifference < 10 ||
        !disabledDates.some((disabledDate) => {
          return (
            date.getDate() === disabledDate.getDate() &&
            date.getMonth() === disabledDate.getMonth() &&
            date.getFullYear() === disabledDate.getFullYear()
          );
        })
      );
    }
    return false;
  };
  return (
    <div className='container-fluid'>
       <Header/>
       <div className="d-flex justify-content-center align-items-center p-5 " style={{ backgroundColor: '#F7F8F9' }}>
      <div className="card m-3">
        <div className="row">
          <div className="col d-flex align-items-center">
            <button className="btn btn-transparent btn-label  " onClick={handleButtonClick}>
              <strong>Examens</strong>
            </button>
            <h5 className="h5 pt-2">&gt; TEF Etudes</h5>
          </div>
        </div>
        <div className="line"></div>
        <div className="row px-3 pb-3">
          <h3 className="card-header">TEF Etudes</h3>
          <h5 className="h5 m-3">Prière de choisir la date de votre examen</h5>
          <div className="card-body custom-calendar-container p-3 ">
            <div className="calendar d-flex justify-content-center align-items-center  ">
          
            <Calendar
                  className="custom-calendar"
                  onClickDay={handleDateClick}
                  value={selectedDate}
                  tileDisabled={tileDisabled} 
                />
              </div>

            <div className="line my-5"></div>
            <div className="row p-2">
              <div className="col-6">
                <div className=" inline">
                  <strong>Cost: </strong>
                </div>
              </div>
              <div className="col-6 px-5 pb-2">
                <div className=" inline text-end ">
                <strong>
                
           
                {Currency ? `${Currency} ${fees ? fees : 'Loading...'} ` : 'Loading...'} 
                  </strong>

                </div>
              </div>
            </div>

            <div className="book-now text-end py-2">
              <button onClick={handleBookNow} className="btn btn-primary" disabled={isBookNowDisabled}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>

   
  );
};

export default TEFEtudes;
