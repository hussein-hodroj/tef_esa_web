import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../pages/SidebarAdmin.js';
import axios from 'axios';

function HomeInfo() {
  const [homeInfo, setHomeInfo] = useState([]);
  const [editableInfo, setEditableInfo] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/info/getHomeinfoData/exam')
      .then((response) => {
        if (response.status === 200) {
          setHomeInfo(response.data);
          setEditableInfo(response.data.slice());
        } else {
          console.error('Error fetching home info data:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error fetching home info data:', error);
      });
  }, []);

  const handleUpdate = (id) => {
    const updatedItem = editableInfo.find((item) => item.infoid === id);

    if (!updatedItem) {
      console.error('Item not found for ID:', id);
      return;
    }

    axios.put(`http://localhost:8000/info/homeinfo/${id}`, updatedItem)
      .then((response) => {
        if (response.status === 200) {
          console.log('Update successful');
        } else {
          console.error('Update error:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error updating home info data:', error);
      });
  };

  const handleRowInputChange = (event, id) => {
    const { name, value } = event.target;

    const updatedData = editableInfo.map((item) => {
      if (item.infoid === id) {
        return { ...item, [name]: value };
      }
      return item;
    });

    setEditableInfo(updatedData);
  };

  return (
    <div className="d-flex">
      <div>
        <SidebarAdmin />
      </div>

      <div className="home-info-container">
        <h1>Update Exams</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Information</th>
              <th>Currency</th>
              <th>Fees</th>
              <th>Link</th>
              <th>type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {editableInfo.map((info) => (
              <tr key={info.infoid}>
                <td>
                  <input
                    type="text"
                    name="title"
                    value={info.title}
                    className="form-control"
                    onChange={(event) => handleRowInputChange(event, info.infoid)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="information"
                    value={info.information}
                    className="form-control"
                    onChange={(event) => handleRowInputChange(event, info.infoid)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="currency"
                    value={info.Currency}
                    className="form-control"
                    onChange={(event) => handleRowInputChange(event, info.infoid)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="fees"
                    value={info.fees}
                    className="form-control"
                    onChange={(event) => handleRowInputChange(event, info.infoid)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="link"
                    value={info.link}
                    className="form-control"
                    onChange={(event) => handleRowInputChange(event, info.infoid)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="link"
                    value={info.type}
                    className="form-control"
                    onChange={(event) => handleRowInputChange(event, info.infoid)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdate(info.infoid)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomeInfo;
