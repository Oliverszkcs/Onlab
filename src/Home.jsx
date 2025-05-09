import React from "react";
import Navbar from "./Components/Header/Navbar";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";
import Adverts from "./Components/Adverts/Adverts";
import Footer from "./Components/Footer/Footer";

function Home() {

    return (
        <>
            <Navbar />
            <Header />
            <Adverts navPoint={"/browse"}/>
            <About />
            <Footer />
        </>
    );
}

export default Home;
