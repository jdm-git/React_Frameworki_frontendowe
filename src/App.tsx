import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useState, useEffect } from 'react';
import './App.scss';
import Home from './pages/home/home';
import PageNotFound from "./pages/404/404";
import User from "./models/user";

import { getPhotoById } from "./api/photos";
import { getUser } from "./api/users";
import Photo from "./models/photo";

import NavBar from './components/NavBar/NavBar';
import LeftSideMenuComponent from './components/left-side-menu/left-side-menu.component';
import Entities from "./pages/entities/entities";
import Profile from "./pages/profile/profile";
import Workspace from "./pages/workspace/workspace";


function App() {
  const userId: number = 1;

  const [user = new User(), setUser] = useState<User>();
  useEffect(() => {
    getUser(userId).then(response => { setUser(response.data); });
  }, [user.id]);

  const [photo = new Photo(), setPhoto] = useState<Photo>();
  useEffect(() => {
    getPhotoById(userId).then(response => { setPhoto(response.data) });
  }, [photo.id]);

  return (
    <div className="App">
      <Router>
        <NavBar/>
        <div className="main-app-content">
          <LeftSideMenuComponent user={user} photo={photo} />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/404">
              <PageNotFound />
            </Route>
            <Route path="/entities">
              <Entities />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/workspace/:id">
              <Workspace />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
