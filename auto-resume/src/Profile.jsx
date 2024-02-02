import React, { useState } from "react";
import "./Profile.css"; // Import the style file

const Profile = ({ userData }) => {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <div className="formbold-main-wrapper">
      {/* Author: FormBold Team */}
      {/* Learn More: https://formbold.com */}
      <div className="formbold-form-wrapper">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src={userData?.avatar_url}
            alt="Your Image"
            className="formbold-img"
          />
          <h2 style={{ textAlign: "center" }}>Hello, {userData?.name}</h2>
        </div>
        <br />

        <form action="https://formbold.com/s/FORM_ID" method="POST">
          <div className="formbold-form-title">
            <h2 className="">Register now</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="firstname" className="formbold-form-label">
                First name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="formbold-form-input"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="formbold-form-label">
                {" "}
                Last name{" "}
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="formbold-form-input"
              />
            </div>
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="email" className="formbold-form-label">
                {" "}
                Email{" "}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="formbold-form-input"
              />
            </div>
            <div>
              <label htmlFor="phone" className="formbold-form-label">
                {" "}
                Phone number{" "}
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="formbold-form-input"
              />
            </div>
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="address" className="formbold-form-label">
              Street Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="formbold-form-input"
            />
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="address2" className="formbold-form-label">
              Street Address Line 2
            </label>
            <input
              type="text"
              name="address2"
              id="address2"
              className="formbold-form-input"
            />
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="state" className="formbold-form-label">
                {" "}
                State/Province{" "}
              </label>
              <input
                type="text"
                name="state"
                id="state"
                className="formbold-form-input"
              />
            </div>
            <div>
              <label htmlFor="country" className="formbold-form-label">
                {" "}
                Country{" "}
              </label>
              <input
                type="text"
                name="country"
                id="country"
                className="formbold-form-input"
              />
            </div>
          </div>

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="post" className="formbold-form-label">
                {" "}
                Post/Zip code{" "}
              </label>
              <input
                type="text"
                name="post"
                id="post"
                className="formbold-form-input"
              />
            </div>
            <div>
              <label htmlFor="area" className="formbold-form-label">
                {" "}
                Area Code{" "}
              </label>
              <input
                type="text"
                name="area"
                id="area"
                className="formbold-form-input"
              />
            </div>
          </div>

          <div className="formbold-checkbox-wrapper">
            <label
              htmlFor="supportCheckbox"
              className="formbold-checkbox-label"
            >
              <div className="formbold-relative">
                <input
                  type="checkbox"
                  id="supportCheckbox"
                  className="formbold-input-checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <div className="formbold-checkbox-inner">
                  <span className="formbold-opacity-0">
                    <svg
                      width="11"
                      height="8"
                      viewBox="0 0 11 8"
                      fill="none"
                      className="formbold-stroke-current"
                    >
                      {/* ... SVG Path ... */}
                    </svg>
                  </span>
                </div>
              </div>
              I agree to the defined
              <a href="#"> terms, conditions, and policies</a>
            </label>
          </div>

          <button type="submit" className="formbold-btn">
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
