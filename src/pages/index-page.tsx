import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/easemypos_logo_square.png";

export function IndexPage() {
   const { isAuthenticated } = useAuth0();

  return (
    <div className="flex flex-col justify-center h-screen p-2 bg-slate-100">
      <div className="flex flex-row justify-center p-5">
        <img
          src={logo}
          alt="logo"
          className=""
          width="200"
          height="200"
        ></img>
      </div>
      <div className="flex flex-col justify-center p-2">
        <p className="self-center p-5">
          "Simple and Dependable Point of Sale"
        </p>
        <div className="self-center p-5">
          {!isAuthenticated && (
            <a
              href="/login"
              className="py-2 px-20 no-underline hover:font-bold text-white rounded bg-main"
            >
              Log In
            </a>
          )}
          {isAuthenticated && (
            <div className="flex flex-col items-center">
                            <a
              href="/Home"
              className="py-2 px-20 no-underline hover:font-bold text-white rounded bg-main"
            >
              Go to Home
            </a>
            or
            <a
              href="/logout"
              className="py-2 px-20 no-underline hover:font-bold text-white rounded bg-main"
            >
              Log Out
            </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
