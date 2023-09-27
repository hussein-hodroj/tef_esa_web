import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarAdmin from './NavbarAdmin';
import SidebarAdmin from './SidebarAdmin';

function EmailTemplateUpdate() {
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/email/emailtemplates')
      .then((response) => {
        setEmailTemplates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching email templates:', error);
      });
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSubject(template.Subject);
    setBody(template.Body);
  };

  const handleUpdateTemplate = () => {
    axios
      .put(`http://localhost:8000/email/emailtemplates/${selectedTemplate.TemplateID}`, {
        Subject: subject,
        Body: body,
      })
      .then((response) => {
        setMessage(response.data.message);
        setEmailTemplates((prevTemplates) =>
          prevTemplates.map((template) =>
            template.TemplateID === selectedTemplate.TemplateID
              ? { ...template, Subject: subject, Body: body }
              : template
          )
        );
        setTimeout(() => {
          setMessage('');
        }, 3000);
      })
      .catch((error) => {
        console.error('Error updating email template:', error);
        setMessage(error.message || 'An error occurred.');
      });
  };

  return (
    <div className="bg-light">
      <NavbarAdmin />
      <div className="d-flex">
        <SidebarAdmin />
        <div className="container m-4">
          <div className="row">
            <div className="col-md-9 mt-5 mb-5">
              <h1>Email Template Update</h1>
              <div className="list-group">
                {emailTemplates.map((template) => (
                  <button
                    key={template.TemplateID}
                    className={`list-group-item list-group-item-action ${
                      template === selectedTemplate ? 'active' : ''
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    {template.Subject}
                  </button>
                ))}
              </div>
              {selectedTemplate && (
                <div>
                  <h2 className='mt-4'>Edit Template</h2>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label mt-2">
                        Subject:
                      </label>
                      <input
                        type="text"
                        className="form-control mt-2"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="body" className="form-label mt-2">
                        Body:
                      </label>
                      <textarea
                        className="form-control mt-2"
                        id="body"
                        style={{ height: '200px' }}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleUpdateTemplate}
                      >
                        Update Template
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {message && (
                <div className="mt-3">
                  <div
                    className={`alert ${
                      message.includes('Error') ? 'alert-danger' : 'alert-success'
                    }`}
                  >
                    {message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailTemplateUpdate;
