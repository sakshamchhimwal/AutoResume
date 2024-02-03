import React, { useEffect, useState } from "react";
import "./Profile.css"; // Import the style file
import { Modal, Select } from "antd";
import githubSvg from "./assets/github-mark.svg";

const Profile = ({ userData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState(userData?.html_url);
  const [degreeName, setDegreeName] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [cpi, setCpi] = useState("");
  const [courses, setCourses] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(selectedItems);
  const filteredOptions = options.filter((o) => !selectedItems.includes(o));
  useEffect(() => {
    fetchRepos();
  }, [userData]);

  const fetchRepos = async (e) => {
    try {
      const apiUrl = `http://localhost:8000/getRepos/${userData?.login}`;
      const token = "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";

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data) {
        setOptions(data);
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error("Error making resume:", error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmitPress = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      githubUrl,
      degreeName,
      gradYear,
      collegeName,
      cpi,
      courses,
      selectedItems,
    };
    if (
      firstName &&
      lastName &&
      email &&
      phone &&
      linkedinUrl &&
      degreeName &&
      gradYear &&
      collegeName &&
      cpi &&
      courses &&
      selectedItems.length === 3
    ) {
      console.log(data);
      showModal();
    }
  };

  return (
    <div className="formbold-main-wrapper">
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
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

        <form>
          <div className="formbold-form-title">
            <h3 className="">Fill your profile</h3>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <img
              style={{ width: "20px", height: "20px" }}
              src={githubSvg}
              alt=""
            />{" "}
            <a style={{ color: "black" }} href={userData?.html_url}>
              {userData?.login}
            </a>
          </div>
          <br />

          <div className="formbold-input-flex">
            <div>
              <label htmlFor="firstname" className="formbold-form-label">
                First name
              </label>
              <input
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
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
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="text"
                name="phone"
                id="phone"
                className="formbold-form-input"
              />
            </div>
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="linkdinUrl" className="formbold-form-label">
              Linkedin URL
            </label>
            <input
              onChange={(e) => {
                setLinkedinUrl(e.target.value);
              }}
              type="text"
              name="linkdinUrl"
              id="linkdinUrl"
              className="formbold-form-input"
            />
          </div>
          <div className="formbold-mb-3">
            <label htmlFor="githubUrl" className="formbold-form-label">
              Github URL
            </label>
            <input
              onChange={(e) => {
                setGithubUrl(e.target.value);
              }}
              defaultValue={userData?.html_url}
              type="text"
              name="address"
              id="githubUrl"
              className="formbold-form-input"
            />
          </div>

          <br />
          <label htmlFor="inst" className="formbold-form-label">
            Education
          </label>
          <div className="formbold-input-flex">
            <div className="formbold-mb-3">
              <label htmlFor="dName" className="formbold-form-label">
                Degree Name
              </label>
              <input
                onChange={(e) => {
                  setDegreeName(e.target.value);
                }}
                type="text"
                name="degreeName"
                id="dName"
                className="formbold-form-input"
              />
            </div>
            <div className="formbold-mb-3">
              <label htmlFor="gYear" className="formbold-form-label">
                Graditution Year
              </label>
              <input
                onChange={(e) => {
                  setGradYear(e.target.value);
                }}
                type="number"
                name="gradYear"
                id="gYear"
                className="formbold-form-input"
              />
            </div>
          </div>

          <div className="formbold-input-flex">
            <div className="formbold-mb-3">
              <label htmlFor="cName" className="formbold-form-label">
                College Name
              </label>
              <input
                onChange={(e) => {
                  setCollegeName(e.target.value);
                }}
                type="text"
                name="collegeName"
                id="cName"
                className="formbold-form-input"
              />
            </div>
            <div className="formbold-mb-3">
              <label htmlFor="cpi" className="formbold-form-label">
                CPI
              </label>
              <input
                onChange={(e) => {
                  setCpi(e.target.value);
                }}
                type="number"
                name="cpi"
                id="cpi"
                max="10"
                min="1"
                className="formbold-form-input"
              />
            </div>
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="courses" className="formbold-form-label">
              Courses
            </label>
            <input
              onChange={(e) => {
                setCourses(e.target.value);
              }}
              placeholder="DSA, CA, DBMS, etc."
              type="text"
              name="address"
              id="courses"
              className="formbold-form-input"
            />
          </div>

          <div className="formbold-mb-3">
            <label htmlFor="courses" className="formbold-form-label">
              Repos :
            </label>
            <Select
              mode="multiple"
              placeholder="Select any three of your repos"
              value={selectedItems}
              onChange={(selectedValues) => {
                // Check if the length exceeds three
                if (selectedValues.length > 3) {
                  alert("Please select only three items.");
                } else {
                  // Update the state if within the limit
                  setSelectedItems(selectedValues);
                }
              }}
              style={{
                width: "100%",
              }}
              options={filteredOptions.map((item) => ({
                value: item.html_url,
                label: item.name,
              }))}
            />
          </div>

          <button onClick={handleSubmitPress} className="formbold-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
