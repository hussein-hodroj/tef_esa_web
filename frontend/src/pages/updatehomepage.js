import React, { useState, useEffect } from 'react';
import './updatehome.css';
import SidebarAdmin from '../pages/SidebarAdmin.js';
import axios from 'axios';
import NavbarAdmin from './NavbarAdmin.js';

function HomeUpdate() {
  const [exams, setExams] = useState('');
  const [body, setBody] = useState('');
  const [usefullinks, setUsefulLinks] = useState('');
  const [titlelink1, setTitleLink1] = useState('');
  const [link1, setLink1] = useState('');
  const [titlelink2, setTitleLink2] = useState('');
  const [link2, setLink2] = useState('');
  const [titlelink3, setTitleLink3] = useState('');
  const [link3, setLink3] = useState('');
  const [titlelink4, setTitleLink4] = useState('');
  const [link4, setLink4] = useState('');
  const [titlelink5, setTitleLink5] = useState('');
  const [link5, setLink5] = useState('');
  const [titlelink6, setTitleLink6] = useState('');
  const [link6, setLink6] = useState('');
  const [titlelink7, setTitleLink7] = useState('');
  const [link7, setLink7] = useState('');
  const [id, setId] = useState(null);
  const [isUpdateSuccessful, setUpdateSuccessful] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/home/homepage')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          const item = data[0];
          setId(item.homeid); 
          setExams(item.exams);
          setBody(item.body);
          setUsefulLinks(item.usefullinks);
          setTitleLink1(item.titlelink1);
          setLink1(item.link1);
          setTitleLink2(item.titlelink2);
          setLink2(item.link2);
          setTitleLink3(item.titlelink3);
          setLink3(item.link3);
          setTitleLink4(item.titlelink4);
          setLink4(item.link4);
          setTitleLink5(item.titlelink5);
          setLink5(item.link5);
          setTitleLink6(item.titlelink6);
          setLink6(item.link6);
          setTitleLink7(item.titlelink7);
          setLink7(item.link7);
        }
      })
      .catch((error) => {
        console.error('Error fetching homepage data:', error);
      });
  }, []);

  const handleHomepageUpdate = () => {
    const updatedData = {
      exams,
      body,
      usefullinks,
      titlelink1,
      link1,
      titlelink2,
      link2,
      titlelink3,
      link3,
      titlelink4,
      link4,
      titlelink5,
      link5,
      titlelink6,
      link6,
      titlelink7,
      link7,
    };

    axios
      .put(`http://localhost:8000/home/homepage/${id}`, updatedData)
      .then((response) => {
        if (response.status === 200) {
          setUpdateSuccessful(true); 
          console.log('Update successful');
        
        } else {
          console.error('Update error:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error updating homepage data:', error);
      });
  };

  useEffect(() => {
    if (isUpdateSuccessful) {
      
      const timeout = setTimeout(() => {
        setUpdateSuccessful(false); 
      }, 4000); 

      return () => clearTimeout(timeout); 
    }
  }, [isUpdateSuccessful]);

  return (

<div>
<NavbarAdmin />


    <div className="d-flex">
     
        <SidebarAdmin />
      

        <div className="home-update-container m-5">
          <div className="section">
            <h1>Home Information</h1>
            <div className="input-grid">
              <div className="input-row">
                <div className="input-col">
                  <label htmlFor="exams" className='mb-3 label-with-margin'>Title of home information:</label>
                  <input type="text"  id="exams" value={exams} onChange={(e) => setExams(e.target.value)} />
                </div>
                <div className="input-row">
                  <label htmlFor="body" className='mb-3 label-with-margin'>Body:</label>
                  <textarea id="body" style={{ height: '200px' }} value={body} onChange={(e) => setBody(e.target.value)} />

                </div>
              </div>
            </div>
          </div>

        <div className="section">
          <div className="linksection">
            <h1>Useful Links</h1>
            <div className="input-grid">
            
            <div className="input-row">
            <div className="input-col">

                <label htmlFor="usefullinks" className='mb-3 label-with-margin'>Title2 of home information :</label>
                <input type="text" id="usefullinks" value={usefullinks} onChange={(e) => setUsefulLinks(e.target.value)} />
              </div>
              </div>
              <div className="input-row">
              <div className="input-col">
                <label htmlFor="titlelink1" className='mb-3 label-with-margin'>Title Link 1:</label>
                <input type="text" className='mb-3 input-with-margin' id="titlelink1" value={titlelink1} onChange={(e) => setTitleLink1(e.target.value)} />
              
              
                <label htmlFor="link1" className='mb-3 label-with-margin'>Link 1:</label>
                <input type="text" className='mb-3 input-with-margin' id="link1" value={link1} onChange={(e) => setLink1(e.target.value)} />
              </div>
              </div>
              <div className="input-row">
              <div className="input-col">
              <label htmlFor="titlelink2" className='mb-3 label-with-margin'>Title Link 2:</label>
                <input type="text" className='mb-3 input-with-margin'  id="titlelink2" value={titlelink2} onChange={(e) => setTitleLink2(e.target.value)} />
              
              
                <label htmlFor="link2" className='mb-3 label-with-margin'>Link 2:</label>
                <input type="text" className='mb-3 input-with-margin' id="link2" value={link2} onChange={(e) => setLink2(e.target.value)} />
              </div>
              </div>

              <div className="input-row">
              <div className="input-col">
              <label htmlFor="titlelink3" className='mb-3 label-with-margin'>Title Link 3:</label>
                <input type="text" className='mb-3 input-with-margin' id="titlelink3" value={titlelink3} onChange={(e) => setTitleLink3(e.target.value)} />
              
              
                <label htmlFor="link3" className='mb-3 label-with-margin'>Link 3:</label>
                <input type="text" className='mb-3 input-with-margin' id="link3" value={link3} onChange={(e) => setLink3(e.target.value)} />
              </div>
              </div>
              <div className="input-row">
              <div className="input-col">
              <label htmlFor="titlelink4" className='mb-3 label-with-margin'>Title Link 4:</label>
                <input type="text" className='mb-3 input-with-margin' id="titlelink4" value={titlelink4} onChange={(e) => setTitleLink4(e.target.value)} />
              
              
                <label htmlFor="link4" className='mb-3 label-with-margin'>Link 4:</label>
                <input type="text" className='mb-3 input-with-margin' id="link4" value={link4} onChange={(e) => setLink4(e.target.value)} />
              </div>
              </div>

              <div className="input-row">
              <div className="input-col">
              <label htmlFor="titlelink5" className='mb-3 label-with-margin'>Title Link 5:</label>
                <input type="text" className='mb-3 input-with-margin' id="titlelink5" value={titlelink5} onChange={(e) => setTitleLink5(e.target.value)} />
              
              
                <label htmlFor="link5" className='mb-3 label-with-margin'>Link 5:</label>
                <input type="text" className='mb-3 input-with-margin' id="link5" value={link5} onChange={(e) => setLink5(e.target.value)} />
              </div>
              </div>


              <div className="input-row">
              <div className="input-col">
              <label htmlFor="titlelink6" className='mb-3 label-with-margin'>Title Link 6:</label>
                <input type="text" className='mb-3 input-with-margin' id="titlelink6" value={titlelink6} onChange={(e) => setTitleLink6(e.target.value)} />
              
              
                <label htmlFor="link6" className='mb-3 label-with-margin'>Link 6:</label>
                <input type="text" className='mb-3 input-with-margin' id="link6" value={link6} onChange={(e) => setLink6(e.target.value)} />
              </div>
              </div>

              <div className="input-row">
              <div className="input-col">
              <label htmlFor="titlelink7" className='mb-3 label-with-margin'>Title Link 7:</label>
                <input type="text" className='mb-3 input-with-margin' id="titlelink7" value={titlelink7} onChange={(e) => setTitleLink7(e.target.value)} />
              
              
                <label htmlFor="link7" className='mb-3 label-with-margin'>Link 7:</label>
                <input type="text" className='mb-3 input-with-margin' id="link7" value={link7} onChange={(e) => setLink7(e.target.value)} />
              </div>
              </div>
            </div>
            {isUpdateSuccessful && (
          <div className="update-success-alert text-success">
            Update successful! 
          </div>
        )}
        <div className="text-right">
            <button onClick={handleHomepageUpdate} className="btn btn-primary mb-4">Update links</button>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default HomeUpdate;
