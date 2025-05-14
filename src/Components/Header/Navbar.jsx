import React, { useState } from "react";
import {Link, scroller} from "react-scroll";
import "../../css/navbar.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Navbar({ keycloak }) {
	const menu = useState(true);
	const navigate = useNavigate();
	const location = useLocation();
	const isAuthenticated = sessionStorage.getItem("token");


	const handleHomeClick = () => {
		if (location.pathname !== "/") {
			navigate("/");
		} else {
			scroller.scrollTo("header", {
				smooth: true,
				duration: 2000,
				delay: 500,
			});
		}
	};
	const handleAboutClick = () => {
		if (location.pathname !== "/") {
			navigate("/");
			setTimeout(() => {
				scroller.scrollTo("about", {
					smooth: true,
					duration: 2000,
					delay: 500,
				});
			}, 500);
		} else {
			scroller.scrollTo("about", {
				smooth: true,
				duration: 2000,
				delay: 500,
			});
		}
	};



	return (
		<nav className="navbar">
			<link href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap" rel="stylesheet"/>
			<div className="logo">
				Szakács Olivér
			</div>
			<div className={menu ? "nav-links" : "nav-links show"}>
				<div className="nav-link">
					<div onClick={handleHomeClick}>
						Home
					</div>
				</div>
				<div className="nav-link">
					<div onClick={handleAboutClick}>
						About
					</div>
				</div>
				<div className="nav-link" onClick={() => navigate("/browse")}>
					Properties
				</div>
			</div>
			<div className={menu ? "action-links" : "action-links action"}>
				{isAuthenticated ? (
					<>
						<div className="button-container">
							<button className="profile-btn">
								<a href="/profile">Profile</a>
							</button>

							<button className="upload-btn">
								<a href="/upload">Upload</a>
							</button>
						</div>
					</>
				) : (
					<button className="nav-button login-btn">
						<a href="/login">Login</a>
					</button>
				)}
			</div>
		</nav>
	);
}
