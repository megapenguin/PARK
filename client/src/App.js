import React, { useState, useEffect, useContext, Component } from "react";

import "./App.css";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  ProtectedRoute,
  Link,
} from "react-router-dom";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Search from "./components/Search";
import Provide from "./components/Provide";
import ProvideRegister from "./components/ProvideRegister";
import MyParkingSpace from "./components/MyParkingSpace";
import MyParkingGarageUpdate from "./components/MyParkingGarageUpdate";
import MyParkingLots from "./components/MyParkingLots";
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

import LoginProtectedRoutes from "./components/ProtectedRoutes/LoginProtectedRoutes";
import AdminProtectedRoutes from "./components/ProtectedRoutes/AdminProtectedRoutes";
import MainProtectedRoutes from "./components/ProtectedRoutes/MainProtectedRoutes";

//CONTEXT
import { AuthContext } from "./components/GlobalContext/AuthContext";

function App() {
  let [b, setB] = useState("PARK");
  let [number, setNumber] = useState(0);
  let [name, setName] = useState("");
  let [users, setUsers] = useState([]);

  const handleIncrement = () => {
    setNumber((prev) => prev + 1);
  };
  const handleWrite = (e) => {
    setName(e.currentTarget.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then((res) => {
        let data = res.data;
        setUsers(data);
        //  console.log(data);
      })

      .catch((error) => console.log(error));
  }, []);

  let Auth = useContext(AuthContext);
  console.log(Auth);
  return (
    <div className="App">
      <React.Fragment>
        <TransactionContextProvider>
          <ParkingContextProvider>
            <UserContextProvider>
              <ProviderContextProvider>
                {!Auth.state.isLoading && (
                  <Router>
                    <Switch>
                      {console.log("rendered")}
                      {/* Ano too?? */}
                      <LoginProtectedRoutes
                        Auth={Auth}
                        path="/login"
                        component={Login}
                        exact
                      />

                      {/* <Route path="/login" component={Login} /> */}

                      <MainProtectedRoutes
                        Auth={Auth}
                        path="/admin"
                        component={Admin}
                        exact
                      />
                      {/* <Route path="/admin" component={Admin} /> */}
                      <MainProtectedRoutes
                        Auth={Auth}
                        path="/view-users"
                        component={ViewUsers}
                        exact
                      />
                      <MainProtectedRoutes
                        Auth={Auth}
                        path="/view-providers"
                        component={ViewProviders}
                        exact
                      />
                      <MainProtectedRoutes
                        Auth={Auth}
                        path="/view-unverified-providers"
                        component={ViewUnverifiedProviders}
                        exact
                      />
                      {/* <MainProtectedRoutes Auth={Auth} path="/sidebar" component={Sidebar} /> */}
                      <MainProtectedRoutes
                        Auth={Auth}
                        path="/transaction-history"
                        component={TransactionRecords}
                        exact
                      />
                      <MainProtectedRoutes
                        Auth={Auth}
                        path="/view-unverified-users"
                        component={ViewUnverifiedUsers}
                        exact
                      />

                      <LoginProtectedRoutes
                        Auth={Auth}
                        path="/register"
                        component={Register}
                        exact
                      />
                      <LoginProtectedRoutes
                        Auth={Auth}
                        path="/welcome"
                        component={Welcome}
                        exact
                      />

                      {/* <Route path="/home" component={Search} /> */}
                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/home"
                        component={Search}
                        exact
                      />
                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/provide"
                        component={Provide}
                        exact
                      />
                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/verify-profile"
                        component={VerifyAccount}
                        exact
                      />
                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/parking-lot-registration"
                        component={ProvideRegister}
                        exact
                      />
                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/my-parking-space"
                        component={MyParkingSpace}
                        exact
                      />
                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/my-parking-space-update"
                        component={MyParkingGarageUpdate}
                        exact
                      />

                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/my-parking-lots"
                        component={MyParkingLots}
                        exact
                      />
                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/search-parking-lot"
                        component={SearchParkingLots}
                        exact
                      />
                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/edit-profile"
                        component={Profile}
                        exact
                      />
                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/profile"
                        component={MainProfile}
                        exact
                      />
                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/profile-settings"
                        component={ProfileSettings}
                        exact
                      />
                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/parking-request"
                        component={SendRequest}
                        exact
                      />
                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/view-parking-lot"
                        component={ViewGarage}
                        exact
                      />
                      <AdminProtectedRoutes
                        Auth={Auth}
                        path="/transaction-records"
                        component={TransactionHistory}
                        exact
                      />
                      <Route component={() => <h1>URL NOT FOUND</h1>} />
                    </Switch>
                  </Router>
                )}
              </ProviderContextProvider>
            </UserContextProvider>
          </ParkingContextProvider>
        </TransactionContextProvider>
      </React.Fragment>
    </div>
  );
}
export default App;
