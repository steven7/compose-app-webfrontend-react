import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import {getUser, getToken, removeUserSession, setUserSession } from './utils/Common';


import './App.css';
import CreateLocalTrack from "./CreateLocalTrack";
import CreateComposeAITrack from "./CreateComposeAITrack";
import CreateDJTrack from "./CreateDJTrack";
import PlayAudio from "./PlayAudio";
import CreateDJTrackWaiting from "./CreateDJTrackWaiting";
import CreateDJTrackComplete from "./CreateDJTrackComplete";
import EditTrack from "./EditTrack";
import Signup from "./Signup";

function App() {

  const [authLoading, setAuthLoading] = useState(true);

  const loggedIn = getUser() != null;

  console.log('loggedIn ' + loggedIn)

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:5000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div className="header">
              <NavLink exact activeClassName="active" to="/">Home</NavLink>
              {loggedIn ?  <></> : <NavLink activeClassName="active" to="/login">Login</NavLink>}
              {loggedIn ?  <></> : <NavLink activeClassName="active" to="/signup">Signup</NavLink>}
              <NavLink activeClassName="active" to="/dashboard">Library</NavLink>
              {loggedIn ? <NavLink activeClassName="active" to="/logout"></NavLink> : <></>}
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/signup" component={Signup} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/playAudio" component={PlayAudio} />

                <PrivateRoute path="/createLocalTrack" component={CreateLocalTrack} />
                <PrivateRoute path="/CreateComposeAITrack" component={CreateComposeAITrack} />
                <PrivateRoute path="/createDJTrack" component={CreateDJTrack} />
                <PrivateRoute path="/createDJTrackWaiting" component={CreateDJTrackWaiting} />
                <PrivateRoute path="/createDJTrackComplete" component={CreateDJTrackComplete} />
                <PrivateRoute path="/editTrack" component={EditTrack} />
                {/*<PrivateRoute path="/createLocalTrack" component={CreateLocalTrack} />*/}
                {/*<PrivateRoute path="/createDJTrack" component={CreateDJTrack} />*/}
                <Route component={Error} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
