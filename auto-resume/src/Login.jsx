import React from "react";
import "./Login.css"; // Import the style file
import { GithubLoginButton } from "react-social-login-buttons";
import logo from "./assets/cv.png";

const Login = ({ handleLoginClick }) => {
  return (
    <div className="formbold-main-wrapper">
      {/* Author: FormBold Team */}
      {/* Learn More: https://formbold.com */}
      <div className="formbold-form-wrapper">
        <form action="https://formbold.com/s/FORM_ID" method="POST">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="formbold-mb-5"
          >
            <img
              style={{ width: "100px", height: "100px" }}
              src={logo}
              alt=""
            />
            <br />
            <label htmlFor="guest" className="formbold-form-label">
              <h1>Auto Resume</h1>
            </label>
          </div>
          <br />
          <h3>Craft the perfect resume for every job</h3>
          <p>
            Our Auto Resume Extension helps you to tailor your resume for the
            job description you are applying for with the help of few clicks.
          </p>
          <br />
          <br />
          <div>
            <GithubLoginButton
              style={{ textAlign: "center" }}
              onClick={handleLoginClick}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
