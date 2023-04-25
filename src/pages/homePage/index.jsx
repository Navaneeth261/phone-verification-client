import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../helpers/fetch_helper.js";
import { AppContext } from "../../App";
import "./homePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { setAppStatus, userDetails, setUserDetails } = useContext(AppContext);

  const [message, setMessage] = useState([]);

  const loginMessage = [
    `You have been successfully authenticated using JWT token. Your registered mobile number is ${userDetails.phoneNumber}. `,
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const response = await get("/api/users/profile");
      if (response?.status) {
        setMessage(response.message);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async() => {
    await get("/api/auth/logout");
    setUserDetails({ userId: "", phoneNumber: "", name: "" });
    setAppStatus({ isLoading: false, isLoggedIn: false });
    navigate("/login");
  };

  const linkData = {
    linkedIn: "https://www.linkedin.com/in/navaneeth261/",
    github_client: "https://github.com/Navaneeth261/phone-verification-client",
    github_server: "https://github.com/Navaneeth261/phone-verification-server",
  };

  const handleOpenLink = (action_type) => {
    let link;
    switch (action_type) {
      case "client":
        link = linkData.github_client;
        break;
      case "server":
        link = linkData.github_server;
        break;
      case "linkedin":
        link = linkData.linkedIn;
        break;
      default:
        link = "#";
    }
    window.open(link, "_blank");
  };

  return (
    <div className="home-container">
      <div className="button-container">
        <button
          className="home-button"
          onClick={() => {
            handleOpenLink("linkedin");
          }}
        >
          View Navaneeth's Profile
        </button>
        <button className="home-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="test-container">
        <h3 className="result-text">
          Hi <span className="name">{userDetails.name}! </span>
        </h3>
        <h4 className="result-text"> {loginMessage}</h4>
      </div>
      <div className="list-container">
        <div className="list">
          {message?.ui && (
            <h3 className="result-text">
              <span className="name-list"> Frontend Features</span>{" "}
              <button
                className="git-button"
                onClick={() => {
                  handleOpenLink("client");
                }}
              >
                View Source
              </button>
            </h3>
          )}
          <ul className="list-text">
            {message?.ui?.map((line, index) => (
              <li key={index}>
                <span>{index + 1}. </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="list">
          {message?.server && (
            <h3 className="result-text">
              <span className="name-list"> Backend Features</span>
              <button
                className="git-button"
                onClick={() => {
                  handleOpenLink("server");
                }}
              >
                View Source
              </button>
            </h3>
          )}
          <ul className="list-text">
            {message?.server?.map((line, index) => (
              <li key={index}>
                <span>{index + 1}. </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
