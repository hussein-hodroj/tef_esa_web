import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../pages/SidebarAdmin.js';
import axios from 'axios';
import AddHomeInfoModal from '../components/courseexam/AddHomeInfoModal.js'; 
import './homeinfomodal.css';
import NavbarAdmin from './NavbarAdmin.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteExamModal from '../components/courseexam/DeleteExamModal.js';

function HomeInfo() {
  const [editableInfo, setEditableInfo] = useState([]);
  const [isUpdateSuccessful, setUpdateSuccessful] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteSuccessful, setDeleteSuccessful] = useState(false);
  const [isDeleteExamModalOpen, setIsDeleteExamModalOpen] = useState(false);
  const [deleteExamId, setDeleteExamId] = useState(null);
  

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

  const openDeleteExamModal = (id) => {
    setDeleteExamId(id);
    setIsDeleteExamModalOpen(true);
  };

 
  const closeDeleteExamModal = () => {
    setIsDeleteExamModalOpen(false);
  };

  const handleDeleteExam = (id, event) => {
    event.preventDefault(); 
    setDeleteExamId(id);
    setIsDeleteExamModalOpen(true);
  };
  

  const confirmDeleteExam = () => {
    axios
      .delete(`http://localhost:8000/info/deleteHomeinfoData/${deleteExamId}`)
      .then((response) => {
        if (response.status === 200) {
          setDeleteSuccessful(true);
          console.log('Exam deleted successfully');
  
          
          setEditableInfo((prevState) =>
            prevState.filter((item) => item.infoid !== deleteExamId)
          );
        } else {
          console.error('Delete error:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error deleting exam info data:', error);
      });
  
  
    setIsDeleteExamModalOpen(false);
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
    <div className="d-flex">
      <SidebarAdmin />
      <div className="home-info-container my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
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
        <div className="row">
          {editableInfo.map((info) => (
            <div className="col-lg-6 mb-4" key={info.infoid} style={{ width: '500px' }}>
              <form>
                <div className="form-group mb-4">
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={info.title}
                    className="form-control"
                    onChange={(event) => handleRowInputChange(event, info.infoid)}
                  />
                </div>
                <div className="form-group mb-4">
                  <label>Information:</label>
                  <textarea
                  style={{ height: '150px' }}
                    type="text"
                    name="information"
                    value={info.information}
                    className="form-control"
                    onChange={(event) => handleRowInputChange(event, info.infoid)}
                  />
                </div>
                <div className="form-group mb-4">
                  <label>Currency:</label>
                  <input
                    type="text"
                    name="Currency"
                    value={info.Currency}
                    className="form-control"
                    onChange={(event) => handleRowInputChange(event, info.infoid)}
                  />
                </div>
                <div className="form-group mb-4">
                  <label>Fees:</label>
                  <input
                    type="text"
                    name="fees"
                    value={info.fees}
                    className="form-control"
                    onChange={(event) => handleRowInputChange(event, info.infoid)}
                  />
                </div>
                <div className="form-group mb-4">
                  <label>Link:</label>
                  <input
                    type="text"
                    name="link"
                    value={info.link}
                    className="form-control"
                    onChange={(event) => handleRowInputChange(event, info.infoid)}
                  />
                </div>
                <div className="form-group mb-4">
                  <label>Type:</label>
                  <input
                    type="text"
                    name="type"
                    value={info.type}
                    className="form-control"
                    onChange={(event) => handleRowInputChange(event, info.infoid)}
                  />
                </div>
                <div className="d-flex justify-content-end">
                <button
                    style={{ marginRight: '10px' }}
                    className="btn btn-danger"
                    onClick={(event) => handleDeleteExam(info.infoid, event)}
                  >
                    Delete
                  </button>
                  <button
                      className="btn btn-primary "
                      onClick={() => handleUpdate(info.infoid)}
                    >
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            ))}
          </div>
          <AddHomeInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <DeleteExamModal
          isOpen={isDeleteExamModalOpen}
          onClose={() => setIsDeleteExamModalOpen(false)}
          onDelete={confirmDeleteExam} 
        />
        </div>
      </div>
    </div>
  );
}

export default HomeInfo;
