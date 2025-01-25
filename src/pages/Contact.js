import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './css/Contact.css'; // Import your CSS file
import Loading from './Loading';
import {useToast} from "../context/ToastContext"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false); // New state to track loading
  const form = useRef();
  const { showToast } = useToast(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true); // Set loading to true when submitting

    // Sending form data to your email
    emailjs
      .sendForm('service_6dvsl0j', 'template_0jrir8o', form.current, {
        publicKey: 'hG81Z2hZVZtSYO52G',
      })
      .then(
        () => {
          // Send auto-reply email to the user
          emailjs
            .sendForm('service_6dvsl0j', 'template_sugbc6b', form.current, {
              publicKey: 'hG81Z2hZVZtSYO52G',
            })
            .then(
                () => {
                  setIsLoading(false);
                  showToast('Message sent successfully! You will receive an auto-reply shortly.', 'success');
                  setFormData({ name: '', email: '', message: '' });
                },
              (error) => {
                setIsLoading(false); // Hide loading spinner
                console.log('Auto-reply failed...', error.text);
              }
            );
        },
        (error) => {
          setIsLoading(false); // Hide loading spinner
          console.log('Message failed...', error.text);
        }
      );
  };

  return (
    <section className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Please fill out the form below, and we'll get back to you as soon as possible.</p>
      </div>

      <div className="contact-form-container">
        <form ref={form} className="contact-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help?"
              required
            ></textarea>
          </div>

          <div className="form-footer">
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>

      {isLoading && (
        <Loading/>
      )}

      <div className="contact-info">
        <h3>Contact Information</h3>
        <ul>
          <li>
            <strong>Email:</strong> sensesentiment@gmail.com
          </li>
          {/* <li>
            <strong>Phone:</strong> +123 456 7890
          </li> */}
        </ul>
      </div>
    </section>
  );
};

export default Contact;
