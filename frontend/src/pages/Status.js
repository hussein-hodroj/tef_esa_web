import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin';
import NavbarAdmin from './NavbarAdmin';
import './Status.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faEdit,
  faCheck,
  faTimes,
  faPlus,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function Status() {
  const [lockDates, setLockDates] = useState([]);
  const [titles, setTitles] = useState([]);
  const [titleData, setTitleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [formData, setFormData] = useState({
    id: '',
    infoid: '',
    formattedDate: '',
    status: '',
    title: titleData,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openEditModal = (lockDate) => {
    setFormData({
      id: lockDate.id,
      infoid: lockDate.infoid,
      formattedDate: lockDate.formattedDate,
      status: lockDate.status,
      title: lockDate.title,
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const refreshLockDates = () => {
    axios.get('http://localhost:8000/status/status').then((response) => {
      setLockDates(response.data);
    });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/status/titles')
      .then((response) => {
        setTitles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching titles:', error);
      });

    axios
      .get('http://localhost:8000/status/status')
      .then((response) => {
        setLockDates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const showDeleteConfirmation = (id) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteItemId !== null) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/status/status/${deleteItemId}`
        );
        console.log('Delete success:', response.data);

        window.location.reload();
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
    setShowDeleteModal(false);
  };

  const handleAddClick = () => {
    setFormData({
      id: '',
      infoid: '',
      formattedDate: '',
      status: '',
      title: titleData,
    });
    setShowAddModal(true);
  };

  
  const handleSubmit = async () => {
   
    const dateParts = formData.formattedDate.split('-');
    const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
  
    const dataToSend = {
      title: formData.title,
      date: formattedDate,
      status: formData.status,
    };
  
    try {
      await axios.post('http://localhost:8000/status/add', dataToSend);
      console.log('Add success');
      window.location.reload();
    } catch (error) {
      console.error('Add error:', error);
    }
    closeAddModal();
  };
  
  const handleEditSubmit = async () => {
    const dateParts = formData.formattedDate.split('-');
    const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
  
    const dataToSend = {
      title: formData.title,
      date: formattedDate,
      status: formData.status,
    };
    try {
      await axios.put(
        `http://localhost:8000/status/status/${formData.id}`,dataToSend);
      console.log('Edit success');
      window.location.reload();
    } catch (error) {
      console.error('Edit error:', error);
    }
    closeEditModal();
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentLockDates = lockDates.slice(startIndex, endIndex);

  const totalPages = Math.ceil(lockDates.length / rowsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-light">
      <NavbarAdmin />
      <div className="d-flex">
        <SidebarAdmin />

        <div className="container m-3">
          <div className="mt-3 mb-3">
            <div className="d-flex justify-content-between mb-3 ">
              <h2>Update lockDate</h2>
             
                <button className="btn btn-primary " onClick={handleAddClick}>
                <FontAwesomeIcon icon={faPlus} /> Add
              </button>
            </div>

            <div className="table-responsive ">
              <table className="table custom-table ">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLockDates.map((lockDate, index) => (
                    <tr key={lockDate.id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{lockDate.title}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        {lockDate.formattedDate}
                      </td>
                      <td>{lockDate.status}</td>
                      <td style={{ display: 'flex', alignItems: 'center' }}>
                      
                         <button
                          onClick={() => openEditModal(lockDate)}
                          className="btn btn-primary ml-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => showDeleteConfirmation(lockDate.id)}
                          className="btn btn-danger mx-2"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                       
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
              <div className="modal-container">
                <div className="modal">
                  <h4>
                    < faTrash /> Confirm Delete
                  </h4>
                  <p>Are you sure you want to delete this lockdate?</p>
                  <div className="text-left">
                    <button
                      onClick={confirmDelete}
                      className="btn btn-danger mx-2"
                    >
                      < faCheck/> Yes
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="btn btn-secondary"
                    >
                      < faTime /> No
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Lock Date Modal */}
            {showEditModal && (
              <div className="modal-container">
                <div className="modal">
                  <h4>Edit Lock Date</h4>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <label htmlFor="title">Title:</label>
                      </div>
                    
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <select
                          name="title"
                          id="title"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          required
                        >
                          <option value="" disabled>
                            Select a title
                          </option>
                          {titles.map((title) => (
                            <option key={title.id} value={title.title}>
                              {title.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6 my-2">
                        <label htmlFor="date">Date:</label>
                       
                      </div>
                      <div className="col-md-6 my-2">
                        <label htmlFor="status">Status:</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={formData.formattedDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              formattedDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <select
                          name="status"
                          id="status"
                          value={formData.status}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                          }
                          required
                        >
                          <option value="" disabled>
                            Select a status
                          </option>
                          <option value="1">1</option>
                          <option value="0">0</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-3 d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary mx-2"
                      onClick={handleEditSubmit}
                    >
                      Save
                    </button>
                    <button
                      onClick={closeEditModal}
                      className="btn btn-secondary"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Pagination */}
            <div className="pagination justify-content-end">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                < faChevonLeft/> Previous
              </button>
              <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next < faChevonRight/>
              </button>
            </div>

            {/* Add Lock Date Modal */}
            {showAddModal && (
              <div className="modal-container">
                <div className="modal">
                  <h4>Add Lock Date</h4>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <label htmlFor="title">Title:</label>
                      </div>
                     
                    </div>
                    <div className="row">
                      <div className="col-md-6 ">
                        <select
                          name="title"
                          id="title"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          required
                        >
                          <option value="" disabled>
                            Select a title
                          </option>
                          {titles.map((title) => (
                            <option key={title.id} value={title.title}>
                              {title.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6 my-2">
                        <label htmlFor="date">Date:</label>
                      </div>
                      <div className="col-md-6 my-2">
                        <label htmlFor="status">Status:</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={formData.formattedDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              formattedDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <select
                          name="status"
                          id="status"
                          value={formData.status}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                          }
                          required
                        >
                          <option value="" disabled>
                            Select a status
                          </option>
                          <option value="1">1</option>
                          <option value="0">0</option>
                        </select>
                      </div>

                    </div>
                  </div>

                  <div className="form-group mt-3 d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary mx-2"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                    <button onClick={closeAddModal} className="btn btn-secondary">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status;
