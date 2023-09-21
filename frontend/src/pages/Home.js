import React, { useState, useEffect } from 'react';
import Header from '../pages/Header.js';
import Footer from '../pages/Footer.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 

function Home() {
  const [homepageData, setHomepageData] = useState([]);
  const [homeinfoData, setHomeinfoData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/home/homepage')
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
        }
        return response.data;
      })
      .then((data) => {
        console.log('Homepage Data received:', data);
        setHomepageData(data);
      })
      .catch((error) => {
        console.error('Error fetching homepage data:', error);
      });

    axios.get('http://localhost:8000/info/getHomeinfoData/exam')
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
        }
        return response.data;
      })
      .then((data) => {
        console.log('Homeinfo Data received:', data);
        setHomeinfoData(data);
      })
      .catch((error) => {
        console.error('Error fetching homeinfo data:', error);
      });

    axios.get('http://localhost:8000/info/getHomeinfoData/course')
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
        }
        return response.data;
      })
      .then((data) => {
        console.log('Course Data received:', data);
        setCourseData(data);
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
      });
  }, []);

  return (
    <div className="home-container">
      <Header />
      
      <main className="container mb-4 mt-4">
       
          {homepageData.map((item) => (
            <div key={item.homeid} className="row"> 
              <div className="col-md-8">
              <h2 className="text-muted small mt-5">{item.exams}</h2>


                <hr className="my-4" />
                {item.body.split('.').map((paragraph, index) => (
                  <p key={index} className="text-left ">{paragraph.trim()}</p>
                ))}
                <h5 class="text-decoration-underline mt-5">{item.usefullinks}</h5>

                <h6>
                  {item.titlelink1}{' '}
                  <a href="https://www.lefrancaisdesaffaires.fr/" rel="noopener noreferrer">
                    Cliquez ici
                  </a>
                </h6>
                <h6>
                  {item.titlelink2}{' '}
                  <a href="https://www.lefrancaisdesaffaires.fr/tests-diplomes/se-preparer/francais-3-0/" rel="noopener noreferrer">
                    Cliquez ici
                  </a>
                </h6>
                <h6>
                  {item.titlelink3}{' '}
                  <a href="https://www.lefrancaisdesaffaires.fr/tests-diplomes/se-preparer/tutoriels-tef/" rel="noopener noreferrer">
                    Cliquez ici
                  </a>
                </h6>
                <h6>
                  {item.titlelink4}{' '}
                  <a href="https://www.lefrancaisdesaffaires.fr/tests-diplomes/outils-preparation-tef/" rel="noopener noreferrer">
                    Cliquez ici
                  </a>
                </h6>
                <h6>
                  {item.titlelink5}{' '}
                  <a href="https://prepmyfuture.com/fr/tef" rel="noopener noreferrer">
                    Cliquez ici
                  </a>
                </h6>
                <h6>
                  {item.titlelink6}{' '}
                  <a href="http://tef.esa.edu.lb/wp-content/themes/esa/inc/assets/pdfs/depliant_tef.pdf" rel="noopener noreferrer">
                    Cliquez ici
                  </a>
                </h6>
                <h6>
                  {item.titlelink7}{' '}
                  <a href="https://www.youtube.com/watch?v=Mvv2yLfbXHw&feature=youtu.be" rel="noopener noreferrer">
                    Cliquez ici
                  </a>
                </h6>
              </div>
              <div className="col-md-2"></div> 
            </div>
          ))}
      
      </main>
     
     
      <main className="container mb-4">
  <div className="row examsection">
    {homeinfoData.map((item) => (
      <div key={item.infoid} className="col-sm-4 mb-4">
        <div className="card mb-4 h-100">
          <h2 className="title text-center my-2" style={{ fontSize: '18px', padding: '10px' }}>
            {item.title}
          </h2>
          <div className="card-body">
            {item.information.split('.').map((paragraph, index) => (
              <p key={index} className="text-left">{paragraph.trim()}</p>
            ))}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <h5 className="text-primary"><strong style={{ color: 'black' }}>Frais :</strong> {item.fees} {item.Currency}</h5>
            </div>
            
          </div>
          <div className="button-container my-2 text-center"> 
  <a href={item.link} rel="noopener noreferrer" className="btn btn-primary btn-md w-75 text-white" style={{ textDecoration: 'none' }}>
    Register
  </a>
</div>

        </div>
        
      </div>
      
    ))}
  </div>
</main>




      <main className="container mb-4 ">
        <div className="row">
          <div className="col-md-8 ">
            {courseData.map((item) => (
              <div key={item.infoid} className='mb-5'>
                <h2 className="text-muted">{item.title}</h2>
                <hr className="my-3" />
                {item.information.split('.').map((paragraph, index) => (
                  <p key={index} className="text-left">{paragraph.trim()}</p>
                ))}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h5 className="text-primary"><strong style={{ color: 'black' }}>Frais :</strong> {item.fees} {item.Currency}</h5>
                </div>
                <div className="button-container mt-4">
                  <a href={item.link} rel="noopener noreferrer" className="btn btn-primary btn-lg">
                    Register
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
