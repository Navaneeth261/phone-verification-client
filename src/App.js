
import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router,Routes, Route, Navigate } from "react-router-dom";
import { get } from "./helpers/api_helper";
import Register from "./pages/RegisterPage";
import HomePage from "./pages/homePage";
import Login from "./pages/loginPage";
import Spinner from "./components/Spinner";
import ToastMessage from "./components/toast";

export const AppContext = createContext(null)

function App() {
  const [userDetails, setUserDetails] = useState({
    isLoading: true,
    isLoggedIn:false,
  })

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {

    const verifyToken = async () => {
      const token = document.cookie?.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      const config = {
          "Authorization" : `Bearer ${token}`
      }
      const response = await get("/api/verify-token",config)
      ShowToastMessage(response?.message)
      if(response?.status) {
        setUserDetails({...response.data,isLoading:false,isLoggedIn:true})

      } else {
        setUserDetails({...userDetails.data, isLoading:false,isLoggedIn:false})
      } 
      }
      verifyToken()
    
  }, [])

  const ShowToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  
  return(
    <>
    {showToast && toastMessage?.length > 0 && <ToastMessage message={toastMessage} />}
    <AppContext.Provider value={{userDetails, setUserDetails}}>
    <Router>
      <Routes>
        <Route exact path="/auth" element={userDetails.isLoading? <Spinner/>: (!userDetails.isLoggedIn ? <Register /> : <Navigate to= {"/"}/> )} />
        <Route exact path="/login" element={userDetails.isLoading? <Spinner/>: (!userDetails.isLoggedIn ? <Login /> : <Navigate to= {"/"}/> )} />
        <Route exact path="/register" element={userDetails.isLoading? <Spinner/>: (!userDetails.isLoggedIn ? <Register /> : <Navigate to= {"/"}/> )} />
        <Route exact path="/" element={userDetails.isLoading? <Spinner/>: (userDetails.isLoggedIn ? <HomePage /> : <Navigate to= {"/login"}/> )} />
      </Routes>
    </Router>
    </AppContext.Provider>
    </>
  )
  
}

export default App;