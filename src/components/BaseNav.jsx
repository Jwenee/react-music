import React from 'react';
import { BrowserRouter as NavLink } from "react-router-dom";
import './BaseNav.scss';

function BaseHeader(props) {
  return (
    <nav className="header-container">
      <NavLink to="/" className="nav-title">
        <div className="nav-txt">
          <span className="txt">
            <em className="txt-word">推荐音乐</em>
          </span>
        </div>
      </NavLink>
      <NavLink to="/" className="nav-title">
        <div className="nav-txt">
          <span className="txt">
            <em className="txt-word">推荐音乐</em>
          </span>
        </div>
      </NavLink>
      <NavLink to="/" className="nav-title">
        <div className="nav-txt">
          <span className="txt">
            <em className="txt-word">推荐音乐</em>
          </span>
        </div>
      </NavLink>
    </nav>
  );
}

export default BaseHeader;