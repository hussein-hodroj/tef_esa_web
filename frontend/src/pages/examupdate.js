import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../pages/SidebarAdmin.js';
import axios from 'axios';
import AddHomeInfoModal from './AddHomeInfoModal.js'; 
import './homeinfomodal.css';
import NavbarAdmin from './NavbarAdmin.js';


function HomeInfo() {
  const [editableInfo, setEditableInfo] = useState([]);
  const [isUpdateSuccessful, setUpdateSuccessful] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteSuccessful, setDeleteSuccessful] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/info/getHomeinfoData/exam')
      .then((response) => {
        if (response.status === 200) {
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

    axios.put(`http://localhost:8000/info/updateHomeinfoData/${id}`, updatedItem)
      .then((response) => {
        if (response.status === 200) {
          setUpdateSuccessful(true); 
          window.location.reload();
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

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/info/deleteHomeinfoData/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setDeleteSuccessful(true);
          console.log('Delete successful');
          
          setEditableInfo((prevState) => prevState.filter((item) => item.infoid !== id));
        } else {
          console.error('Delete error:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error deleting home info data:', error);
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

  useEffect(() => {
    if (isDeleteSuccessful) {
      
      const timeout = setTimeout(() => {
        setDeleteSuccessful(false); 
      }, 4000); 

      return () => clearTimeout(timeout); 
    }
  }, [isDeleteSuccessful]);

  return (
    <div>
      <NavbarAdmin />
      <div  className="d-flex">
      
      <SidebarAdmin />
      

      <div className="home-info-container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Exam Information</h2>
        <button
          className="btn btn-primary btn-md"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="bi bi-plus"></i> Add
        </button>
      </div>
      {isDeleteSuccessful && (
          <div className="alert alert-danger" role="alert">
            Item deleted successfully.
          </div>
        )}
        {isUpdateSuccessful && (
  <div className="alert alert-success" role="alert">
    Item updated successfully.
  </div>
)}
        <table className="table table-bordered table-sm custom-table my-4">

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
                  <textarea
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
                    name="Currency"
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
                    name="type"
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
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(info.infoid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddHomeInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
    </div>
  );
}

export default HomeInfo;
