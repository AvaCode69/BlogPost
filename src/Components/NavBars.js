import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Blog from "./Blog";
import Home from "./Home";
import logo from "../images/logo.svg";

export default function NavBars() {
  return (
    <Router>
      <header className="container-fluid bg-sec-header">
        <img className="logo-img" src={logo}></img>
        <ul className="nav">
          <li className="nav-item">
            <NavLink
              to="/"
              exact
              className="nav-link "
              activeClassName=" is-active"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/blog"
              className="nav-link "
              activeClassName="is-active"
            >
              BLog
            </NavLink>
          </li>
        </ul>
      </header>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
      </Switch>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
