import Explore from "./Pages/Explore";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import WhyWebloom from "./Pages/WhyWebloom";
import Login from "./Pages/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCurrentUser } from "./Redux/authSlice";
import ProtectedRoute from "./Components/ProtectedRoute";
import Studio from "./Pages/Studio";
import Projects from "./Pages/Projects";
import DeployedSite from "./Pages/DeployedSite";
import Pricing from "./Pages/Pricing"

function App(){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return(
    <div>
      <BrowserRouter>
        <Routes>
        {/* Public Routes */}
        
        <Route path="/" element={<Home />} />
        <Route path="/why-webloom" element={<WhyWebloom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/site/:slug" element={<DeployedSite />} />
        <Route path="/explore" element={<Explore />} />

        {/* Protected Routes */}

        <Route
            path="/projects"
            element={
                <ProtectedRoute>
                    <Projects />
                </ProtectedRoute>
            }
        />

        <Route
            path="/studio"
            element={
                <ProtectedRoute>
                    <Studio />
                </ProtectedRoute>
            }
        />

        <Route
            path="/studio/:projectId"
            element={
                <ProtectedRoute>
                    <Studio />
                </ProtectedRoute>
            }
        />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
};

export default App;