import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useFetcher, useNavigate } from 'react-router-dom';
import './Calendar.css';
import Calendar from 'react-calendar';
import Axios from 'axios';


const TEFEtudes = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [infoid, setinfoid] = useState(null); 
  const [isBookNowDisabled, setIsBookNowDisabled] = useState(true);
  const [Currency, setCurrency] = useState(null);

  const navigate = useNavigate();
  const [fees, setFees] = useState(null); 

  useEffect(() => {
   
    Axios.get('http://localhost:8000/TEFEtudes/TEFEtudes') 
      .then((response) => {
        setFees(response.data[0].fees); 
        setCurrency(response.data[0].Currency);
        setinfoid(response.data[0].infoid);
      })
      .catch((error) => {
        console.error('Error fetching fees data:', error);
      });

      
  }, []);


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
      &fees=${fees}&infoid=${infoid}&Currency=${Currency}`;
      navigate(`/register?${queryParams}`);
    } else {
      alert('You have to choose at least one test to book a time.');
    }
  };

  const joinedDate = new Date();
  joinedDate.setDate(joinedDate.getDate() + 10);

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const filterWeekends = (date) => {
    return !isWeekend(date);
  };

  return (
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
                value={selectedDate}
                onChange={handleDateClick}
                minDate={joinedDate}
                tileDisabled={({ date }) => isWeekend(date)}
                className="custom-calendar"
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
  );
};

export default TEFEtudes;
