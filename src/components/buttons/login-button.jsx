import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LoginButton = ({className}) => {
  const { loginWithRedirect } = useAuth0();
  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
    });
  };

  return (
    <button type="button" className={className} onClick={handleLogin}>
      Log In
    </button>
  );
};