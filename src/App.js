import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { get } from "./helpers/fetch_helper";
import Register from "./pages/RegisterPage";
import HomePage from "./pages/homePage";
import Login from "./pages/loginPage";
import Spinner from "./components/Spinner";
import ToastMessage from "./components/toast";

export const AppContext = createContext(null);

function App() {
  const [userDetails, setUserDetails] = useState({
    userId: "",
    phoneNumber: "",
    name: "",
  });

  const [appstatus, setAppStatus] = useState({
    isLoading: true,
    isLoggedIn: false,
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      const response = await get("/api/verify-token");
      ShowToastMessage(response?.message);
      if (response?.status) {
        setUserDetails(response.data);
        setAppStatus({ isLoading: false, isLoggedIn: true });
      } else {
        setAppStatus({ isLoading: false, isLoggedIn: false });
      }
    };
    verifyToken();
  }, []);

  const ShowToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      {showToast && toastMessage?.length > 0 && (
        <ToastMessage message={toastMessage} />
      )}
      <AppContext.Provider value={{ userDetails, setUserDetails, appstatus, setAppStatus }}>
        <Router>
          <Routes>
            <Route exact path="/login" element={appstatus.isLoading? <Spinner/>: (!appstatus.isLoggedIn ? <Login /> : <Navigate to= {"/"}/> )} />
            <Route exact path="/register" element={appstatus.isLoading? <Spinner/>: (!appstatus.isLoggedIn ? <Register /> : <Navigate to= {"/"}/> )} />
            <Route exact path="/" element={appstatus.isLoading? <Spinner/>: (appstatus.isLoggedIn ? <HomePage /> : <Navigate to= {"/login"}/> )} />
          </Routes>
        </Router>

      </AppContext.Provider>
    </>
  );
}

export default App;
