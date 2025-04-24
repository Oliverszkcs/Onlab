import React, { useEffect, useState } from "react";
import Navbar from "./Components/Header/Navbar";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";
import Apartments from "./Components/Apartments/Apartments";
import Works from "./Components/Works/Works";
import Services from "./Components/Services/Services";
import Agents from "./Components/Agents/Agents";
import Adverts from "./Components/Adverts/Adverts";
import Footer from "./Components/Footer/Footer";

function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <>
            <Navbar keycloak={"asd"} />
            <Header />
            <About />
            <Apartments />
            <Works />
            <Services />
            <Agents />
            <Adverts />
            <Footer />
        </>
    );
}

export default Home;
