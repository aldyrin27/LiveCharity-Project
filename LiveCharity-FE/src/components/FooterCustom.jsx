import React from 'react';
import './FooterCustom.css'

export default function FooterCustom()  {
  return (
    <footer className="footer-blue text-light py-3 mt-5" style={{ fontSize: '20px' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Live Charity is a web app for individuals to do live streaming while making donations to help people.</p>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <p>Email : support@livecharity.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div className="col-md-4">
            <h5>Profile</h5>
            <p>Follow us on social media:</p>
            <a href="#" className="text-dark me-2">
              <i className="bi bi-facebook text-light" style={{ fontSize: '2rem' }}></i>
            </a>
            <a href="#" className="text-dark me-2">
              <i className="bi bi-twitter text-light" style={{ fontSize: '2rem' }}></i>
            </a>
            <a href="#" className="text-dark me-2">
              <i className="bi bi-linkedin text-light" style={{ fontSize: '2rem' }}></i>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <p>&copy; 2023 LiveCharity.com. All rights reserved.</p>
      </div>
    </footer>
  );
};
