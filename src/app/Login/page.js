"use client";
import React, { useState } from "react";
import styles from "@/styles/modules/Signup.module.scss"; // ✅ reuse signup styles
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const LoginModal = () => {
 
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {  setIsLoggedIn} = useUser();
  const validate = () => {
    const newErrors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Valid email required";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setServerError("");
    setLoading(true);

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
       setIsLoggedIn(true)
        router.push("/");
      } else {
        setServerError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setServerError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupBox}>
        <button className={styles.closeButton} onClick={() => router.push("/")}>
          ×
        </button>
        <h2 className={styles.heading}>Welcome Back</h2>
        <p className={styles.subheading}>Log in to your account</p>
        {serverError && <div className={styles.error}>{serverError}</div>}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && (
              <small className={styles.error}>{errors.email}</small>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            {/* <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" /> */}
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
            {errors.password && (
              <small className={styles.error}>{errors.password}</small>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? <span className={styles.spinner}></span> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
