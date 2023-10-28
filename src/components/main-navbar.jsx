import { useState } from "react";

export function MainNavbar(props) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="">
      <div className="px-2 mx-auto bg-main">
        <div className="flex justify-between bg-main">
          <div className="flex space-x-5 items-center">
            {/* Logo */}
            <div className="flex py-2 px-2">
              {props.tittle && <a href="/dashboard" className="no-underline hover:font-bold text-white">
                {props.tittle}
              </a>}
              {!props.tittle && <p className="text-white">Please Select Company</p>}
            </div>

            {/* Primary Nav-Bar */}
            <div className="hidden md:flex items-center space-x-3">

            </div>
          </div>
          {/* Seconday Nav-bar */}
          <div className="flex items-center">
            <a
              href="/logout"
              className="py-0.4 px-2 no-underline hover:font-bold text-white rounded border-2 border-slate-200"
            >
              Log Out
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}