import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Upload from "./Upload";
import Profile from "./Profile";
import Login from "./Components/Login/Login";
import ApartmentBrowser from "./Components/Apartments/ApartmentBrowser";
import PrivateRoute from "./PrivateRoute";
import ApartmentDetails from "./Components/Apartments/ApartmentDetails";

function App() {
    return (
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/browse" element={<ApartmentBrowser />} />


                    <Route path="/upload" element={<PrivateRoute element={<Upload />} />} />
                    <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                    <Route path="/property/:id" element={<ApartmentDetails />} />
                </Routes>
            </Router>
    );
}

export default App;
