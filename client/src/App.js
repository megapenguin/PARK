import React, { useState, useEffect, useContext, Component } from "react";

import "./App.css";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Search from "./components/Search";
import Provide from "./components/Provide";
import ProvideRegister from "./components/ProvideRegister";
import MyParkingSpace from "./components/MyParkingSpace";
import SearchParkingLots from "./components/SearchParkingLots";
import Profile from "./components/Profile";
import MainProfile from "./components/MainProfile";
import VerifyAccount from "./components/VerifyAccount";
import SendRequest from "./components/SendRequest";
import ViewGarage from "./components/ViewGarage";
import TransactionHistory from "./components/TransactionHistory";
import ProfileSettings from "./components/ProfileSettings";
import Sidebar from "./components/layouts/Sidebar";

import ViewUsers from "./components/ViewUsers";
import ViewProviders from "./components/ViewProviders";
import ViewUnverifiedUsers from "./components/ViewUnverifiedUsers";
import ViewUnverifiedProviders from "./components/ViewUnverifiedProviders";
import TransactionRecords from "./components/TransactionRecords";

import Admin from "./components/Admin";

import { UserContextProvider } from "./context/UserContext";
import { ProviderContextProvider } from "./context/ProviderContext";
import { ParkingContextProvider } from "./context/ParkingContext";
import { TransactionContextProvider } from "./context/TransactionContext";

function App() {
  let [b, setB] = useState("PARK");
  let [number, setNumber] = useState(0);
  let [name, setName] = useState("");
  let [users, setUsers] = useState([]);

  const handleIncrement = () => {
    setNumber(prev => prev + 1);
  };
  const handleWrite = e => {
    setName(e.currentTarget.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then(res => {
        let data = res.data;
        setUsers(data);
        //  console.log(data);
      })

      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <React.Fragment>
        <TransactionContextProvider>
          <ParkingContextProvider>
            <UserContextProvider>
              <ProviderContextProvider>
                <Router>
                  <Switch>
                    <Route path="/admin" component={Admin} />
                    <Route path="/view-users" component={ViewUsers} />
                    <Route path="/view-providers" component={ViewProviders} />
                    <Route
                      path="/view-unverified-providers"
                      component={ViewUnverifiedProviders}
                    />
                    <Route path="/sidebar" component={Sidebar} />
                    <Route
                      path="/transaction-history"
                      component={TransactionRecords}
                    />
                    <Route
                      path="/view-unverified-users"
                      component={ViewUnverifiedUsers}
                    />

                    <Route path="/register" component={Register} />
                    <Route path="/welcome" component={Welcome} />
                    <Route path="/login" component={Login} />
                    <Route path="/home" component={Search} />
                    <Route path="/provide" component={Provide} />
                    <Route path="/verify-profile" component={VerifyAccount} />
                    <Route
                      path="/parking-lot-registration"
                      component={ProvideRegister}
                    />
                    <Route
                      path="/my-parking-space"
                      component={MyParkingSpace}
                    />
                    <Route
                      path="/search-parking-lot"
                      component={SearchParkingLots}
                    />
                    <Route path="/edit-profile" component={Profile} />
                    <Route path="/profile" component={MainProfile} />
                    <Route
                      path="/profile-settings"
                      component={ProfileSettings}
                    />
                    <Route path="/parking-request" component={SendRequest} />
                    <Route path="/view-parking-lot" component={ViewGarage} />
                    <Route
                      path="/transaction-history"
                      component={TransactionHistory}
                    />
                    <Route component={() => <h1>URL NOT FOUND</h1>} />
                  </Switch>
                </Router>
              </ProviderContextProvider>
            </UserContextProvider>
          </ParkingContextProvider>
        </TransactionContextProvider>
      </React.Fragment>
    </div>
  );
}
export default App;
