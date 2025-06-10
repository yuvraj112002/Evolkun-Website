"use client";

import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import styles from "@/styles/modules/GoogleButton.module.scss";
// optional toast lib
import { useAuth } from "@/context/UserContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./loadingSpinner";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { loginWithGoogle, isLoading } = useAuth();
  return (
    <div className={styles.loginButton}>
      {loading && (
        <LoadingSpinner/>
      )}
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            setLoading(true); // Start loading
            if (!credentialResponse.credential) {
              throw new Error("No credential received.");
            }
            const data = await loginWithGoogle(credentialResponse.credential);
          
            if (data.success) {
              router.push("/");
              
              toast.success(data.message || "Successfully login!");
              return;
            }else{
              toast.error(data?.message || "Something went wrong");
            }
          } catch (error) {
            console.error("Login failed or cancelled:");
            toast.error("Something went wrong");
            router.push("/");
          } finally {
            setLoading(false);
          }
        }}
        theme="filled_blue"
        text="continue_with"
        onError={() => {
          console.log("Login Failed");
          toast.error("Something went wrong");
        }}
        useOneTap
      />
      ;
    </div>
  );
}
