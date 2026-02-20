import React from 'react';
import logImg from "../../../assets/images/log.svg";

const LeftPanel = ({ onToggle }) => {
  return (
    <div className="panel left-panel">
      <div className="content">
        <h3>New here?</h3>
        <p>
          Join us to explore the world with the best travel packages and experiences.
        </p>
        <button 
          className="btn transparent" 
          id="sign-up-btn" 
          onClick={() => onToggle("signup")} // Must match 'signup' string
        >
          Sign up
        </button>
      </div>
      <img src={logImg} className="image" alt="" />
    </div>
  );
};

export default LeftPanel;