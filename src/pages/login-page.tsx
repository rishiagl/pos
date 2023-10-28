import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const { loginWithRedirect } = useAuth0();
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
    });
  };

  if (!isAuthenticated) {
    handleLogin();
  }
  else {
    navigate('/home');
  }

  return <>
  You are loggind in please go to <a href="/home" className="underline">Home</a></>;
}
