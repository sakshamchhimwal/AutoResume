import React from "react";
import "./Login.css"; // Import the style file
import { GithubLoginButton } from "react-social-login-buttons";

const Login = ({ handleLoginClick }) => {
  return (
    <div className="formbold-main-wrapper">
      {/* Author: FormBold Team */}
      {/* Learn More: https://formbold.com */}
      <div className="formbold-form-wrapper">
        <form action="https://formbold.com/s/FORM_ID" method="POST">
          <div className="formbold-mb-5">
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

// import React from "react";
// import { GithubLoginButton } from "react-social-login-buttons";
// import classes from "./style.module.css";
// import logo from "./assets/logo.png";

// const Login = ({ handleLoginClick }) => {
//   return (
//     <div
//       className={classes.login}
//       style={{ padding: "20px", borderRadius: "10px" }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-around",
//           alignItems: "center",
//         }}
//       >
//         <img style={{ width: "60px", height: "60px" }} src={logo} alt="" />
//         <h3>Auto Resume</h3>
//       </div>
//       <br />
//       <br />
//       <p>
//         We are building a Chrome Extension (basically an exten- sion to a
//         Web-Dev project) which will help to streamline the process of
//         automatically generating resumes that are curated as per the job
//         requirement and the company’s vision.
//       </p>
//       <br />
//       <br />
//       <GithubLoginButton
//         style={{ textAlign: "center" }}
//         onClick={handleLoginClick}
//       />
//     </div>
//   );
// };

// export default Login;
