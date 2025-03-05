import React from 'react';
import './App.css';
import "primereact/resources/primereact.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { httpClient } from './HttpClient';
import Keycloak from 'keycloak-js';
import Home from "./Home";
import Upload from "./Upload";
import Profile from "./Profile";
import axios from "axios";


let keycloak = new Keycloak({
    url: 'http://localhost:8080/',
    realm: 'Mission_Rent_Possible',
    clientId: 'reactlogin',
});

window.keycloak = keycloak;


keycloak.init({
    onLoad: 'login-required',
    checkLoginIframe: true,
    pkceMethod: 'S256',
}).then((auth) => {
    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
        console.log('auth', auth)
        console.log('Keycloak', keycloak)
        console.log('Access Token', keycloak.token)

        const {preferred_username,email,} = keycloak.tokenParsed;
        try {
            axios.post("http://localhost:8082/users/save", {
                name: preferred_username,
                email: email,
            });
            console.log("User saved: ", preferred_username, email,);
        } catch (error) {
            console.error("Error saving user:", error);
        }

        httpClient.defaults.headers.common['Authorization'] = `Bearer ${keycloak.token}`;
        keycloak.onTokenExpired = () => {
            console.log('token expired')
        }
    }
}, () => {
    console.error("Authentication Failed");
});


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home keycloak={keycloak}/>}></Route>
                <Route path="/upload" element={<Upload/>}></Route>
                <Route path="/profile" element={<Profile />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;