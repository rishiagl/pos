import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const SignupButton = ({className}) => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <button className={className} onClick={handleSignUp}>
      Sign Up
    </button>
  );
};