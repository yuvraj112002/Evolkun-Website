// SignupModal.js with API request to send OTP
'use client'
import React, { useState, useEffect } from 'react';
import styles from '@/styles/modules/Signup.module.scss';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { useRouter } from 'next/navigation';

const SignupModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [userCountry, setUserCountry] = useState('in');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Enter a valid phone number';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setServerError('');

    try {
      setLoading(true);
      const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data)
      if (res.ok && data.success) {
        setShowOtpField(true);
      } else {
        setServerError(data.message || 'Something went wrong. Please register again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setServerError('Server error. Please try again later.');
    } finally{
      setLoading(false); // stop spinner
    }
  };

const handleOtpVerify = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    const res = await fetch('/api/user/verifyOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ otp })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert('OTP verified successfully!');
      router.push('/');
    } else {
      alert(data.message || 'Invalid or expired OTP. Please try again.');
    }
  } catch (error) {
    console.error('OTP verification error:', error);
    alert('Something went wrong. Please try again later.');
  } finally{
    setLoading(false);
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
        <button className={styles.closeButton} onClick={() => router.push('/')}>×</button>

        <h2 className={styles.heading}>Welcome to Evolkun</h2>
        <p className={styles.subheading}>Create your account or log in</p>

        {serverError && <div className={styles.error}>{serverError}</div>}

        {!showOtpField ? (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
              {renderValidationIcon('name')}
              {errors.name && <small className={styles.error}>{errors.name}</small>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
              {renderValidationIcon('email')}
              {errors.email && <small className={styles.error}>{errors.email}</small>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Create a password" value={formData.password} onChange={handleChange} />
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

           <button type="submit" className={styles.submitButton} disabled={loading}>
  {loading ? <span className={styles.spinner}></span> : 'Send OTP'}
</button>

          </form>
        ) : (
          <form className={styles.form} onSubmit={handleOtpVerify}>
            <div className={styles.inputGroup}>
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                placeholder="6-digit code"
                value={otp}
                onChange={handleOtpChange}
              />
            </div>
            <button type="submit" className={styles.submitButton} disabled={loading}>
  {loading ? <span className={styles.spinner}></span> : 'Verify & Continue'}
</button>
            {/* <button type="submit" className={styles.submitButton}>Verify & Continue</button> */}
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
