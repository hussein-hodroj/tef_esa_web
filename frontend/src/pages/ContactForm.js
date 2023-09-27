import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/send-email/send-email', formData);

      if (response.status === 200) {
        setSuccessMessage('Email sent successfully!');


        setTimeout(() => {
          setSuccessMessage(null);
          setFormData({
            name: '',
            email: '',
            message: '',
          });
        }, 3000);
      } else {
        console.error('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <section className="contact d-flex ">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 my-4">
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5 mb-3">Contact us</h5>
            <p>Want to get in touch? We'd love to hear from you.</p>
            <p>Here's how you can reach us:</p>
            <div className="email">
              <h5><i className="bi bi-envelope"></i> Example@email.com</h5>
            </div>
          </div>
          <div className="col-lg-8 my-4">
            <form onSubmit={handleSubmit} className="">
              <div className="row">
                <div className="col-md-6 form-group mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0 mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group mt-3">
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="d-flex justify-content-end pt-3">
                <Button type="submit" className="btn ms-2" style={{ backgroundColor: '#0077b6', color: '#fff' }}>
                  Send Message
                </Button>
              </div>
              {successMessage && ( 
                <div className="alert alert-success mt-3" role="alert">
                  {successMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
