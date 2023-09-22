import React, { useState } from 'react';
import axios from 'axios';

function AddHomeInfoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    information: '',
    Currency: '',
    fees: '',
    link: '',
    type: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    axios.post('http://localhost:8000/info/createHomeinfoData', formData)
      .then((response) => {
        if (response.status === 201) { 
          console.log('Data added successfully');
          setFormData({
            title: '',
            information: '',
            Currency: '',
            fees: '',
            link: '',
            type: '',
          });
          onClose();
          window.location.reload();
        } else {
          console.error('Error adding data:', response.status, response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
          <h2 className="mb-4 my-2">Add Home Info</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="information" className="form-label">
                Information:
              </label>
              <textarea
                id="information"
                name="information"
                value={formData.information}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Currency" className="form-label">
                Currency:
              </label>
              <input
                type="text"
                id="Currency"
                name="Currency"
                value={formData.Currency}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fees" className="form-label">
                Fees:
              </label>
              <input
                type="text"
                id="fees"
                name="fees"
                value={formData.fees}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="link" className="form-label">
                Link:
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Type:
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="text-center mb-2">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              {' '}
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}

export default AddHomeInfoModal;
