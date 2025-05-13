'use client'
import React, { useState, useEffect } from 'react';
import styles from '@/styles/modules/Signup.module.scss';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

const SignupModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [userCountry, setUserCountry] = useState('in');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_code) {
          setUserCountry(data.country_code.toLowerCase());
        }
      })
      .catch(() => setUserCountry('in'));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Enter a valid phone number';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert('Form submitted successfully!');
    }
  };

  const renderValidationIcon = (field) => {
    if (!formData[field]) return null;
    if (errors[field]) return <span className={`${styles['validation-icon']} ${styles.invalid}`}>❌</span>;
    return <span className={`${styles['validation-icon']} ${styles.valid}`}>✔️</span>;
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupBox}>
        <h2 className={styles.heading}>Welcome to Evolkun</h2>
        <p className={styles.subheading}>Create your account or log in</p>

        <button className={styles.oauthButton}>
          <img src="/svgs/google-icon.svg" alt="Google" />
          <span>Continue with Google</span>
        </button>

        <div className={styles.separator}>OR</div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {renderValidationIcon('name')}
            {errors.name && <small className={styles.error}>{errors.name}</small>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {renderValidationIcon('email')}
            {errors.email && <small className={styles.error}>{errors.email}</small>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            {renderValidationIcon('password')}
            {errors.password && <small className={styles.error}>{errors.password}</small>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone">Phone Number</label>
            <PhoneInput
              country={userCountry}
              value={formData.phone}
              onChange={handlePhoneChange}
              enableSearch
              inputStyle={{ width: '100%' }}
              dropdownStyle={{ zIndex: 9999 }}
            />
            {errors.phone && <small className={styles.error}>{errors.phone}</small>}
          </div>

          <button type="submit" className={styles.submitButton}>Continue</button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;