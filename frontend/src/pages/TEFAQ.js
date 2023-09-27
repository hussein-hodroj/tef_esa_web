import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';
import Calendar from 'react-calendar';
import Axios from 'axios';
import Header from '../pages/Header.js';
import Footer from '../pages/Footer.js';
import { format } from 'date-fns';


const TEFAQ = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [infoid, setinfoid] = useState(null); 
  const [type, settype] = useState(null); 
  const [Currency, setCurrency] = useState(null);
  const [date, setdate] = useState(null);
  const [title, settitle] = useState(null);
  const [isBookNowDisabled, setIsBookNowDisabled] = useState(true);
  const [disabledDates, setDisabledDates] = useState([]);
  const [numBookings, setNumBookings] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [formatDate, setFormatDate] = useState(null);
 
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
        settype(response.data[0].type);
        setinfoid(response.data[0].infoid); 
        settitle(response.data[0].title); 
      })
      .catch((error) => {
        console.error('Error fetching fees data:', error);
      });
    
  }, []);
  useEffect(() => {
    Axios.get('http://localhost:8000/TEFAQ/TEFAQ-date')
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
    const formated = format(date, 'yyyy-MM-dd')
    setFormatDate(formated);
    setSelectedDate(date);
    
    setBookedDates([...bookedDates, date]);
    setIsBookNowDisabled(false);
  };

  const handleButtonClick = () => {
    navigate('/');
  };

  const handleBookNow = () => {
    Axios
      .get(`http://localhost:8000/register/date/${formatDate}`)
      .then((response) => {
        console.log(response.data.count)
         if (response.data.count <= 20) {

           if (selectedDate && totalCost > 0) {
      const queryParams = `date=${selectedDate.toISOString()}&tests=${JSON.stringify(
        selectedTests)}&cost=${totalCost}&fees=${fees}&infoid=${infoid}&Currency=${Currency}&title=${title}&type=${type} `;
      navigate(`/register?${queryParams}`);
      }else {
        alert('You have to choose at least one test to book a time.');
      }
        }else{
    alert("Nous n'avons plus de places disponibles pour cette journée");
}
      }) 
      .catch((error) => console.log(error));
    
  };
  

  const toggleTest = (testName) => {
    setSelectedTests({
      ...selectedTests,
      [testName]: !selectedTests[testName],
    });
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
       <div className="d-flex justify-content-center align-items-center p-5" style={{ backgroundColor: '#F7F8F9' }}>
      <div className="card m-3">
        <div className="row">
          <div className="col d-flex align-items-center">
            <button className="btn btn-transparent btn-label" onClick={handleButtonClick}>
            <strong style={{ color: 'red' }}>Examens</strong>
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
                  className="custom-calendar"
                  onClickDay={handleDateClick}
                  value={selectedDate}
                  tileDisabled={tileDisabled} 
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
                      Expression orale ({Currency} {fees})
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
              <div className="col-12">
                <div className="text-end">
                <strong style={{fontWeight: 'bold'}}>Cost: </strong>
                <strong>
                        <span style={{ color: 'blue' }}>
                          {totalCost ? totalCost : 'Loading...'}
                        </span>
                        {' '}
                        <span style={{ color: 'red' }}>
                          {Currency ? Currency : 'Loading...'}
                        </span>
                      </strong>
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
    <Footer/>
    </div>
   
  );
};

export default TEFAQ;
