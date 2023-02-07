import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Blog from "./BlogPage/Blog";
import Home from "./HomePage/Home";
import logo from "../images/logo.svg";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function NavBars() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  return (
    <Router>
      <header className="bg-sec-header">
        <nav className="container navigation">
          <img className="logo-img" src={logo}></img>
          <button
            className="hamburger"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            <FaBars size="30px" color="#fff" mt-5 />
          </button>

          <div
            className={
              isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
            }
          >
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
          </div>
        </nav>
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
