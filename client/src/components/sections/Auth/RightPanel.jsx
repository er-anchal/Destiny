import React from 'react';
import registerImg from "../../../assets/images/register.svg";

const RightPanel = ({ onToggle }) => {
  return (
    <div className="panel right-panel">
      <div className="content">
        <h3>One of us?</h3>
        <p>
          Welcome back! Sign in to access your account and booked trips.
        </p>
        <button 
          className="btn transparent" 
          id="sign-in-btn" 
          onClick={() => onToggle("signin")} // Must match 'signin'
        >
          Sign in
        </button>
      </div>
      <img src={registerImg} className="image" alt="" />
    </div>
  );
};

export default RightPanel;