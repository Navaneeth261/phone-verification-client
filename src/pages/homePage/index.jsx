import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../helpers/fetch_helper.js";
import { AppContext } from "../../App";
import "./homePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { setAppStatus, userDetails, setUserDetails } = useContext(AppContext);

  const [message, setMessage] = useState([]);
  const [verificationHistory, setVerificationHistory] = useState({});

  const loginMessage = [
    `You have been successfully authenticated using JWT token. Your registered mobile number is ${userDetails.phoneNumber}. `,
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const response = await get("/api/users/profile");
      if (response?.status) {
        setMessage(response.message);
        setVerificationHistory(response.data.verificationHistory);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await get("/api/users/logout");
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

  const convertDate = (isoDate) => {
    if (!isoDate) {
      return null;
    }
    const date = new Date(isoDate);
    const options = {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    //const formattedDate = new Date(isoDate).toLocaleTimeString([],options)

    const formattedDate = date.toLocaleDateString("en-IN", options);
    //const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
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
          Navaneeth's Profile
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

      {verificationHistory && Object.keys(verificationHistory).length > 1 && (
        <h3 className="result-text">
          <span className="name-list">
            {" "}
            User Verification and Login History
          </span>{" "}
        </h3>
      )}
      <div className="desktop-table">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0 40px",
          }}
        >
          {verificationHistory &&
            Object.keys(verificationHistory).length > 1 && (
              <table style={{ border: "1px solid black", width: "auto" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Event</th>
                    <th style={{ border: "1px solid black" }}>SMS Status</th>
                    <th style={{ border: "1px solid black" }}>SMS Sent At</th>
                    <th style={{ border: "1px solid black" }}>
                      Verification Attempts
                    </th>
                    <th style={{ border: "1px solid black" }}>
                      Verification Status
                    </th>
                    <th style={{ border: "1px solid black" }}>Verified At</th>
                    <th style={{ border: "1px solid black" }}>Logged Out At</th>
                    <th style={{ border: "1px solid black" }}>
                      Logs / Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(verificationHistory).reverse().map((verification) => (
                    <tr key={verification.id}>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        {verification.code_type}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        {verification.sentStatus.toString()}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        {convertDate(verification.createdAt)}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        {verification.attempts}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        {verification.isVerified.toString()}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        {convertDate(verification.verifiedAt)}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        {convertDate(verification.loggedOutAt)}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          textAlign: "center",
                        }}
                      >
                        {verification.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </div>

      <div
        className="mobile-table"
        style={{
        }}
      >
        <table
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
            width: "80%",
            marginBottom: "10px 10px",
            tableLayout: "fixed",
          }}
        >
          <tbody>
            {Object.values(verificationHistory).reverse().map((verification, index) => (
              <div>
                <tr key={index} style={{ flex: 1 }}>
                  <th
                    style={{
                      border: "1px solid black",

                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    Event
                  </th>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {verification.code_type}
                  </td>
                </tr>
                <tr style={{ flex: 1 }}>
                  <th
                    style={{
                      border: "1px solid black",

                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    SMS Status
                  </th>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {convertDate(verification.createdAt)}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",

                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    Verification Attempts
                  </th>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {verification.attempts}
                  </td>
                </tr>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",

                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    Verification Status
                  </th>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {verification.isVerified.toString()}
                  </td>
                </tr>

                <tr>
                  <th
                    style={{
                      border: "1px solid black",

                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    Verified At
                  </th>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {convertDate(verification.verifiedAt)}
                  </td>
                </tr>

                <tr>
                  <th
                    style={{
                      border: "1px solid black",

                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    Logged Out At
                  </th>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {convertDate(verification.loggedOutAt)}
                  </td>
                </tr>

                <tr>
                  <th
                    style={{
                      border: "1px solid black",

                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    Logs / Actions
                  </th>
                  <td
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    {verification.status}
                  </td>
                </tr>
                <div style={{ marginTop: "10px" }}></div>
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
