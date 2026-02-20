import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../components/sections/Auth/AuthForm.css";
import SignInForm from "../components/sections/Auth/SignInForm";
import SignUpForm from "../components/sections/Auth/SignUpForm";
import LeftPanel from "../components/sections/Auth/LeftPanel";
import RightPanel from "../components/sections/Auth/RightPanel";

const AuthForm = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.isAdmin ? '/admin/dashboard' : '/');
    }
  }, [user, navigate]);

  // This function handles the class toggle
  const toggleMode = (mode) => {
    setIsSignUpMode(mode === "signup");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      document.documentElement.style.height = "auto";
      document.body.style.height = "auto";
    };
  }, []);

  return (
    <div className="auth-form-page">
      <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <Link to="/" className="logo-link">
          <img src="/logo.png" alt="Destiny Logo" className="logo-img" />
        </Link>
        
        <div className="forms-container">
          <div className="signin-signup">
            <SignInForm />
            <SignUpForm />
          </div>
        </div>

        <div className="panels-container">
          {/* CRITICAL: Passing the function as 'onToggle' */}
          <LeftPanel onToggle={toggleMode} />
          <RightPanel onToggle={toggleMode} />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;