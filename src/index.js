import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { loginRequest } from "./authConfigb2c";

import Checkout from './components/Checkout';
import Success from './components/Success';
import Canceled from './components/Canceled';
import { ProfileData } from "./components/ProfileData";

import { callMsGraph } from "./graph";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig, b2cPolicies } from "./authConfigb2c";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { EventType, InteractionType } from "@azure/msal-browser";

import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import './css/normalize.css';
import './css/global.css';
import "./index.bundle.css";
import { DashboardLayout } from "./components/Layout";


const msalInstance = new PublicClientApplication(msalConfig);


/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
 const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
      // Silently acquires an access token which is then attached to a request for MS Graph data
      instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0]
      }).then((response) => {
          callMsGraph(response.accessToken).then(response => setGraphData(response));
      });
  }

  return (
      <>
          <h5 className="card-title">Welcome {accounts[0].name}</h5>
          {graphData ? 
              <ProfileData graphData={graphData} />
              :
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"  onClick={RequestProfileData}>Request Profile Information</button>
          }
      </>
  );
};



const IdTokenContent = () => {
  /**
   * useMsal is hook that returns the PublicClientApplication instance, 
   * an array of all accounts currently signed in and an inProgress value 
   * that tells you what msal is currently doing. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { accounts } = useMsal();
  const [idTokenClaims, setIdTokenClaims] = useState(null);

  function GetIdTokenClaims() {
      setIdTokenClaims(accounts[0].idTokenClaims)
  }

  return (
      <>
          <h5 className="card-title">Welcome {accounts[0].name}</h5>
          {/* {idTokenClaims ?
              <IdTokenClaims idTokenClaims={idTokenClaims} />
              :
              <Button variant="secondary" onClick={GetIdTokenClaims}>View ID Token Claims</Button>
          } */}
      </>
  );
};

/**
* Most applications will need to conditionally render certain components based on whether a user is signed in or not. 
* msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will 
* only render their children if a user is authenticated or unauthenticated, respectively.
*/
const MainContent = () => {

  const { instance } = useMsal();

  /**
   * Using the event API, you can register an event callback that will do something when an event is emitted. 
   * When registering an event callback in a react component you will need to make sure you do 2 things.
   * 1) The callback is registered only once
   * 2) The callback is unregistered before the component unmounts.
   * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/events.md
   */
  useEffect(() => {
      
      const callbackId = instance.addEventCallback((event) => {
          if (event.eventType === EventType.LOGIN_FAILURE) {
              if (event.error && event.error.errorMessage.indexOf("AADB2C90118") > -1) {
                  if (event.interactionType === InteractionType.Redirect) {
                      instance.loginRedirect(b2cPolicies.authorities.forgotPassword);
                  } else if (event.interactionType === InteractionType.Popup) {
                      instance.loginPopup(b2cPolicies.authorities.forgotPassword)
                          .catch(e => {
                              return;
                          });
                  }
              }
          }

          if (event.eventType === EventType.LOGIN_SUCCESS) {
              if (event?.payload) {
                  /**
                   * We need to reject id tokens that were not issued with the default sign-in policy.
                   * "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr").
                   * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
                   */
                  if (event.payload.idTokenClaims["acr"] === b2cPolicies.names.forgotPassword) {
                      window.alert("Password has been reset successfully. \nPlease sign-in with your new password");
                      return instance.logout();
                  }
              }
          }
      });

      return () => {
          if (callbackId) {
              instance.removeEventCallback(callbackId);
          }
      };
  }, []);

  return (
      <div className="App">
          <AuthenticatedTemplate>
              <IdTokenContent />
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
              <h5 className="card-title">Please sign-in to see your profile information.</h5>
          </UnauthenticatedTemplate>
      </div>
  );
};


export default function App({msalInstance}) {
  return (
    <MsalProvider instance={msalInstance}>
    <Router>
      <Switch>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/canceled">
          <Canceled />
        </Route>
        <Route path="/profile">
          <DashboardLayout>
          <div>
              <MainContent ></MainContent>
              <AuthenticatedTemplate>
                  <ProfileContent />
              </AuthenticatedTemplate>

              <UnauthenticatedTemplate>
                  <h5 className="card-title">Please sign-in to see your profile information.</h5>
              </UnauthenticatedTemplate>
          </div>
          </DashboardLayout>
        </Route>
        <Route path="/">
        <DashboardLayout>
          <div>Hello this is a test web page</div>
          </DashboardLayout>
        </Route>
      </Switch>
    </Router>
    </MsalProvider>
  );
}

ReactDOM.render(      
      
          <App msalInstance={msalInstance} />
     
, document.getElementById('root'));
