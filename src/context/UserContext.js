"use client";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for active session on first mount
  const checkAuthProfile = async () => {
    //  if (isLoading) return;
    try {
      console.log("fetching user profile");
      const response = await fetch("/api/user/profile", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      console.log("checkAuthProfile call ");
      const data = await response.json();

      if (data.user) {
        setUser(data.user);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        return data.user; // ✅ allow other components to use this
      } else {
        setUser(null);
        sessionStorage.removeItem("user");
        return null;
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      sessionStorage.removeItem("user");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const cachedUser = sessionStorage.getItem("user");
    if (cachedUser) {
      console.log("✅ Cached user found");
      setUser(JSON.parse(cachedUser));
      setIsLoading(false);
    } else {
      console.log("🔁 No cached user found, calling API...");
      checkAuthProfile().then((userData) => {
        if (userData) sessionStorage.setItem("user", JSON.stringify(userData));
      });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/user/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.removeItem("user"); // Clear cached user data
        setUser(null);
      }
      return data;
    } catch (error) {
      console.error("Logout failed:", error);
      return { message: "Something went wrong" };
    } finally {
      setUser(null);
      if (typeof window !== "undefined") {
      }
      setIsLoading(false);
    }
  };

  const sendOtp = async (email) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/otp/send-otp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Send OTP failed:", error);
      return { message: "Something went wrong" };
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async (email) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/otp/resend-otp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Send OTP failed:", error);
      return { message: "Something went wrong" };
    } finally {
      setIsLoading(false);
    }
  };
  const verifyOtp = async (email, otp) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (data.success) {
        login(data.user);
      }
      return data;
      // return false;
    } catch (error) {
      console.error("Verify OTP failed:", error);
      return { message: "Something went wrong" };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (idToken) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/google-login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
      }
      return data;
    } catch (error) {
      console.log(error);
      return { message: "Something went wrong" };
    } finally {
      setIsLoading(false);
    }
  };

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
        checkAuthProfile,
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
