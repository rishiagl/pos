import { Route, Routes } from "react-router-dom";
import { CallbackPage } from "./pages/callback-page";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "./pages/page-loader";
import { NotFoundPage } from "./pages/pageNotFound";
import "./App.css";
import { IndexPage } from "./pages/index-page";
import { LoginPage } from "./pages/login-page";
import { LogoutPage } from "./pages/logout-page";
import { AuthenticationGuard } from "./authentication-guard";
import { HomePage } from "./pages/home-page";

export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/home" element={<AuthenticationGuard component={HomePage}/>}/>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/logout"
        element={<AuthenticationGuard component={LogoutPage} />}
      />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
