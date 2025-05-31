"use client";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage (only in browser)
  useEffect(() => {
    const storedUser = typeof window !== "undefined" && localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Check for active session on first mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof window !== "undefined") checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/user/logout", {
        method: "GET",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    }
  };

  const sendOtp = async (email) => {
    try {
      const response = await fetch("/api/otp/send-otp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("Send OTP failed:", error);
      return false;
    }
  };

    const resendOtp = async (email) => {
    try {
      const response = await fetch("/api/otp/resend-otp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("Send OTP failed:", error);
      return false;
    }
  };
  const verifyOtp = async (email, otp) => {
    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (data.success) {
        login(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Verify OTP failed:", error);
      return false;
    }
  };

  const loginWithGoogle = async(idToken)=>{
    try {
         const response = await fetch("/api/auth/google-login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({token: idToken }),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user)
      }
      return data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        resendOtp,
        logout,
        sendOtp,
        verifyOtp,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
