// src/components/ContactLinks/index.tsx

import React from 'react';
import './ContactLinks.css';

const ContactLinks: React.FC = () => {
  return (
    <div className="contact-links-container">
      <a href="mailto:lucas@lucas-cruz.com">
        <img src="https://img.icons8.com/ios-filled/50/apple-mail.png" alt="Email" className="icon" />
      </a>
      <a href="https://linkedin.com/in/lucasdearaujocruz" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" className="icon" />
      </a>
      <a href="https://github.com/cruz-lucas" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="GitHub" className="icon" />
      </a>
      <a href="https://twitter.com/_Lucas_Cruz" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" alt="Twitter" className="icon" />
      </a>
    </div>
  );
};

export default ContactLinks;
