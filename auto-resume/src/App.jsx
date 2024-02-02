import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const CLIENT_ID = "a12b9b0d5b4c0a8f85b3";
function App() {
  const [render, setRender] = useState(false);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);
    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getToken() {
        await fetch("http://localhost:8000/getAccessToken?code=" + codeParam, {
          method: "GET",
        })
          .then(async (response) => {
            return await response.json();
          })
          .then((data) => {
            console.log(data);
            if (data.access_token)
              localStorage.setItem("accessToken", data.access_token);
            setRender(!render);
          });
      }
      getToken();
    }
    getUserData();
  }, []);

  async function getUserData() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      await fetch("http://localhost:8000/getUserData?token=" + token, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then(async (response) => {
          return await response.json();
        })
        .then((data) => {
          console.log(data);
        });
    }
  }
  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }

  return (
    <>
      <button onClick={loginWithGithub}>login with github</button>
    </>
  );
}

export default App;
