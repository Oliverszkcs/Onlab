import React, { useState } from "react";
import { Link } from "react-scroll";
import "../../css/navbar.css";
export default function Navbar({ keycloak }) {
	const [menu, setMenu] = useState(true);

	const showMenu = () => {
		setMenu(!menu);
	};

	const isAuthenticated = sessionStorage.getItem("token");

	return (

		<nav className="navbar">
			<link href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap" rel="stylesheet"/>
			<div className="logo">
				Szakács Olivér
			</div>
			<div className={menu ? "nav-links" : "nav-links show"}>
				<div className="nav-link">
					<Link
						to="header"
						spy={true}
						smooth={true}
						duration={2000}
						delay={500}
					>
						Home
					</Link>
				</div>
				<div className="nav-link">
					<Link
						to="about"
						spy={true}
						smooth={true}
						duration={2000}
						delay={500}
					>
						About
					</Link>
				</div>
				<div className="nav-link">
					<Link
						to="apartments"
						spy={true}
						smooth={true}
						duration={2000}
						delay={500}
					>
						Apartments
					</Link>
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
