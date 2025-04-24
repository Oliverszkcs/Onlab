import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Upload from "./Upload";
import Profile from "./Profile";
import Login from "./Components/Login/Login";
import "./App.css";
import ApartmentBrowser from "./Components/Apartments/ApartmentBrowser";

function App() {
    return (
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/browse" element={<ApartmentBrowser />} />
                </Routes>
            </Router>
    );
}

export default App;
