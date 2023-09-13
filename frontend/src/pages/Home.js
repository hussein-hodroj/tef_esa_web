import React, { useState, useEffect } from 'react';
import Header from '../pages/Header.js';
import Footer from '../pages/Footer.js';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import canadaLogo from '../assets/ca.png';
import './Home.css'; 

function Home() {
  const [homepageData, setHomepageData] = useState([]);
  const [homeinfoData, setHomeinfoData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/home/homepage') 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data received:', data);
        setHomepageData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/info/homeinfo') 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data received:', data);
        setHomeinfoData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="home-container">
      <Header />
      
      <main className="container mb-4">
        {homepageData.map((item) => (
          <div key={item.homeid} className="row">
            <div className="col-sm-1"></div> 
            <div className="col-md-8">
              <h2>{item.exams}</h2>
              <hr />
              <p>{item.body}</p>
              <h5>{item.usefullinks}</h5>
              <h6>
                {item.titlelink1}{' '}
                <a href="https://www.lefrancaisdesaffaires.fr/" target="_blank" rel="noopener noreferrer">
                  Click Here
                </a>
              </h6>
              <h6>
                {item.titlelink2}{' '}
                <a href="https://www.lefrancaisdesaffaires.fr/tests-diplomes/se-preparer/francais-3-0/" target="_blank" rel="noopener noreferrer">
                  Click Here
                </a>
              </h6>
              <h6>
                {item.titlelink3}{' '}
                <a href="https://www.lefrancaisdesaffaires.fr/tests-diplomes/se-preparer/tutoriels-tef/" target="_blank" rel="noopener noreferrer">
                  Click Here
                </a>
              </h6>
              <h6>
                {item.titlelink4}{' '}
                <a href="https://www.lefrancaisdesaffaires.fr/tests-diplomes/outils-preparation-tef/" target="_blank" rel="noopener noreferrer">
                  Click Here
                </a>
              </h6>
              <h6>
                {item.titlelink5}{' '}
                <a href="https://prepmyfuture.com/fr/tef" target="_blank" rel="noopener noreferrer">
                  Click Here
                </a>
              </h6>
              <h6>
                {item.titlelink6}{' '}
                <a href="http://tef.esa.edu.lb/wp-content/themes/esa/inc/assets/pdfs/depliant_tef.pdf" target="_blank" rel="noopener noreferrer">
                  Click Here
                </a>
              </h6>
              <h6>
                {item.titlelink7}{' '}
                <a href="https://www.youtube.com/watch?v=Mvv2yLfbXHw&feature=youtu.be" target="_blank" rel="noopener noreferrer">
                https://youtu.be/Mvv2yLfbXHw
                </a>
              </h6>
            </div>
            <div className="col-md-2 "></div> 
           
          </div>
        ))}
      </main>
      <img src={canadaLogo} alt="Canada Logo" className="canada-logo" />
      <main className="container mb-4">
  <div className="row">
    {homeinfoData.map((item) => (
      <div key={item.infoid} className="col-md-2">
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="title">{item.title}</h2> 
            <p>{item.information}</p>
            <h5><strong style={{color : 'black'}}> Fees : </strong>({item.fees})</h5>
            <button className="register-button"><a href={item.link} target="_blank" rel="noopener noreferrer" className="register-a">
            Register
          </a></button>
          </div>
        </div>
      </div>
    ))}
  </div>
</main>


      <Footer />
    </div>
  );
}

export default Home;
