import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import GamesList from "./GamesList";
import NewGameForm from "./NewGameForm";
import GameShowPage from "../components/GameShowPage.js";
import EditGameForm from "./EditGameForm.js";
import Home from "./Home.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <div className={currentUser ? "logged-in" : null}>
      <Router>
        <TopBar user={currentUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/games" component={GamesList} />
          <Route exact path="/games/new" component={NewGameForm} />
          <Route exact path="/games/:id/edit" component={EditGameForm} />
          <Route exact path="/games/:id" render={(props) => <GameShowPage {...props} user={currentUser} />} />
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
        </Switch>
      </Router>
    </div>
  );
};

export default hot(App);
