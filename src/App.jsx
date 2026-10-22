import Explore from "./Pages/Explore";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import WhyWebloom from "./Pages/WhyWebloom";
import Login from "./Pages/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCurrentUser } from "./Redux/authSlice";
import ProtectedRoute from "./Components/ProtectedRoute";
import Studio from "./Pages/Studio.";
import Projects from "./Pages/Projects";
import DeployedSite from "./Pages/DeployedSite";

function App(){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path ="/" element = {<Home></Home>} />
          <Route
              path="/explore"
              element={
                  <ProtectedRoute>
                      <Explore />
                  </ProtectedRoute>
              }
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/studio/:projectId" element={<Studio />} />
          <Route path="/why-webloom" element={<WhyWebloom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/site/:slug" element={<DeployedSite />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
};

export default App;