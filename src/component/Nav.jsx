import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import _ from 'lodash'
function Nav(props) {
  var buttons;

  if (!_.isEmpty(props.user)) {
    console.log(']props nav ',props.user);
    buttons = (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            site name
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item right">
                <Link
                onClick={props.LogOut}
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  log out
                </Link>
              </li>

              <Link
                className="nav-link active"
                aria-current="page"
                to={`/profile:${props.user._id}`}
              >
                {props.user._id}
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
  buttons = ( <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          site name
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/login">
                login
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/register"
              >
                register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
)  }

  return (buttons);
}

export default Nav;
