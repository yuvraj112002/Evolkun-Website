"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import styles from "@/styles/modules/ProfileDropdown.module.scss";
import { toast } from "react-toastify";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async() => {
   const data = await logout();
   toast.success( data?.message )
    setIsOpen(false);
     router.push("/");
  };

  if (!user) return null;

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <button className={styles.avatarBtn} onClick={() => setIsOpen(!isOpen)}>
        <img
         loading="lazy"
          src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
          alt="Profile"
          className={styles.avatar}
        />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.menuHeader}>
            <p>{user.name}</p>
            <small>{user.email}</small>
          </div>
           <button className={styles.menuItem} onClick={()=>{ setIsOpen(false); router.push("/profile")}}>
            Your Profile
          </button>
          
          <button onClick={handleLogout} className={styles.menuItem}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
