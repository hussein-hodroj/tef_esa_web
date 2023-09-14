import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';
import Calendar from 'react-calendar';
import Axios from 'axios';

const TEFAQ = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [costPerBooking, setCostPerBooking] = useState(55); 
  const [infoid, setinfoid] = useState(null); 
  const [numBookings, setNumBookings] = useState(1);
  const [totalCost, setTotalCost] = useState(0); 
  const [Currency, setCurrency] = useState(null);
  const [isBookNowDisabled, setIsBookNowDisabled] = useState(true);
  const [selectedTests, setSelectedTests] = useState({
    comprehensionEcrite: false,
    comprehensionOrale: false,
    expressionEcrite: false,
    expressionOrale: false,
  });

  const navigate = useNavigate();
  const [fees, setFees] = useState(null); 

  useEffect(() => {
   
    Axios.get('http://localhost:8000/TEFAQ/TEFAQ') 
      .then((response) => {
        setFees(response.data[0].fees); 
        setCurrency(response.data[0].Currency);
        setinfoid(response.data[0].infoid); 
      })
      .catch((error) => {
        console.error('Error fetching fees data:', error);
      });
    
  }, []);
  console.log("=>fees",fees)
  useEffect(() => {
    let newTotalCost = 0;
    if (selectedTests.comprehensionEcrite) {
      newTotalCost += fees;
    }
    if (selectedTests.comprehensionOrale) {
      newTotalCost += fees;
    }
    if (selectedTests.expressionEcrite) {
      newTotalCost += fees;
    }
    if (selectedTests.expressionOrale) {
      newTotalCost += fees;
    }

    newTotalCost *= numBookings;

    setTotalCost(newTotalCost);
  }, [selectedTests, numBookings]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setBookedDates([...bookedDates, date]);
    setIsBookNowDisabled(false);
  };

  const handleButtonClick = () => {
    navigate('/');
  };







  const handleBookNow = () => {
    if (selectedDate && totalCost > 0) {
      const queryParams = `date=${selectedDate.toISOString()}&tests=${JSON.stringify(
        selectedTests)}&cost=${totalCost}&fees=${fees}&infoid=${infoid}&Currency=${Currency}`;
      navigate(`/register?${queryParams}`);
    } else {
      alert('You have to choose at least one test to book a time.');
    }
  };
  

  const toggleTest = (testName) => {
    setSelectedTests({
      ...selectedTests,
      [testName]: !selectedTests[testName],
    });
  };

  const handleNumBookingsChange = (selectedOption) => {
    setNumBookings(selectedOption.value);
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
    <div className="d-flex justify-content-center align-items-center p-5" style={{ backgroundColor: '#F7F8F9' }}>
      <div className="card m-3">
        <div className="row">
          <div className="col d-flex align-items-center">
            <button className="btn btn-transparent btn-label" onClick={handleButtonClick}>
              <strong>Examens</strong>
            </button>
            <h5 className="h5 pt-2">&gt; TEFAQ – Quebec</h5>
          </div>
        </div>
        <div className="line"></div>
        <div className="row px-3 pb-3">
          <h3 className="card-header">TEFAQ – Quebec</h3>
          <h5 className="h5 m-3">Prière de choisir la date de votre examen</h5>
          <div className="card-body custom-calendar-container p-3">
            <div className="calendar d-flex justify-content-center align-items-center">
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
              <div className="col">
                <div className="inline">
                  <strong>Choisissez les épreuves souhaitées :</strong>
                </div>
              </div>
             
                <div className="row mt-3">
                  <div className="col-6">
                    <label className="checkbox-label">
                      <input type="checkbox" onChange={() => toggleTest('expressionEcrite')} />
                      Expression écrite ({Currency} {fees})
                    </label>
                  </div>
                  <div className="col-6">
                    <label className="checkbox-label">
                      <input type="checkbox" onChange={() => toggleTest('expressionOrale')} />
                      Expression orale (({Currency}) {fees})
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label className="checkbox-label">
                      <input type="checkbox" onChange={() => toggleTest('comprehensionEcrite')} />
                      Compréhension écrite ({Currency} {fees})
                    </label>
                  </div>
                  <div className="col-6">
                    <label className="checkbox-label">
                      <input type="checkbox" onChange={() => toggleTest('comprehensionOrale')} />
                      Compréhension orale ({Currency} {fees})
                    </label>
                  </div>
                </div>
             
            </div>
            <div className="row p-2">
              <div className="col-6">
                <div className="inline">
                  <strong>Cost:</strong>
                </div>
              </div>
              <div className="col-6 px-5 pb-2">
                <div className="inline text-end">
                  <strong> {Currency} {totalCost} </strong>
                </div>
              </div>
            </div>
            <div className="row p-2">
             
            
            </div>
            <div className="book-now text-end py-2">
              <button onClick={handleBookNow} className="btn btn-primary" disabled={isBookNowDisabled || totalCost === 0}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TEFAQ;
