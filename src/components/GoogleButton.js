"use client";
import { useEffect } from "react";
import { useGoogleLogin, googleLogout, googleOneTap, GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner"; // optional toast lib
import { useAuth } from "@/context/UserContext";

export default function GoogleLoginButton() {
  const {loginWithGoogle} = useAuth()
  return (
    <div>
      <GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
    if (!credentialResponse.credential) {
      throw new Error("No credential received.");
    }
      const data = await loginWithGoogle(credentialResponse.credential);
  }
      catch (error) {
        console.error("Login failed or cancelled:", err.message);
      }
    }
  }
    theme="filled_blue"
    text="continue_with"
    onError={() => {
      console.log('Login Failed');
  }}
  // useOneTap
/>;
    </div>
  );
}
