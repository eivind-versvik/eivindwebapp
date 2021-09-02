/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import Icon from "awesome-react-icons";
import React, { useState } from "react";
import { useIsAuthenticated } from "@azure/msal-react";

import { loginRequest } from "../authConfigb2c";
import { useMsal } from "@azure/msal-react";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

export const NavSidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  return (
    <React.Fragment>
      {/* Sidebar Overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />

      <div>
        <button
          className="btn-menu"
          onClick={() => setIsSidebarOpen(true)}
          type="button"
        >
          <Icon name="burger" className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center mt-10 text-center py-6">
          <span className="mx-2 text-2xl font-semibold text-black">
            Eivind Test Page
          </span>
        </div>

        {/* https://github.com/abhijithvijayan/react-minimal-side-navigation */}
        <Navigation
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
          items={[
            {
              title: "Home",
              itemId: "/",
              // Optional
              elemBefore: () => <Icon name="coffee" />
            },
            {
              title: "Payment Strip (test)",
              itemId: "/do_nothing_here",
              elemBefore: () => <Icon name="user" />,
              subNav: [
                {
                  title: "Checkout Page",
                  itemId: "/checkout",
                  // Optional
                  elemBefore: () => <Icon name="cloud-snow" />
                },
                {
                  title: "Cancel Page",
                  itemId: "/canceled",
                  // Optional
                  elemBefore: () => <Icon name="cloud-snow" />
                },
                {
                  title: "Success Page",
                  itemId: "/success",
                  elemBefore: () => <Icon name="coffee" />
                }
              ]
            },
            {
              title: "Information",
              itemId: "/another",
              subNav: [
                {
                  title: "Profile Data",
                  itemId: "/profile"
                  // Optional
                  // elemBefore: () => <Icon name="calendar" />
                }
              ]
            }
          ]}
        />

        <div className="absolute bottom-0 w-full my-8">


        <nav
                  role="navigation"
                  aria-label="side-navigation"
                  className="side-navigation-panel"
                >
              <ul className="side-navigation-panel-select">
              <li className="side-navigation-panel-select-wrap">
              <div className="side-navigation-panel-select-option" onClick={() => {               
                    { 
                        isAuthenticated ?
                            instance.logoutRedirect({
                              postLogoutRedirectUri: "/"
                            })
                        :            
                            instance.loginRedirect(loginRequest).catch(e => {
                              console.log(e);
                            })
                      }
                        }}>
                <span className="side-navigation-panel-select-option-wrap">
                    {/** Prefix Icon Component */}
                    { <Icon name="activity" />}

                    <span className="side-navigation-panel-select-option-text">
                    { isAuthenticated  ? "Logout" : "Login" }
                    </span>
                  </span>
                  </div>
                  </li>
                  </ul>
                  
        </nav>

        </div>
      </div>
    </React.Fragment>
  );
};


