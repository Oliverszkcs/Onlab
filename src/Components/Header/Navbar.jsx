import React, { useState } from "react";
import { Link } from "react-scroll";

export default function Navbar({ keycloak }) {
	const [menu, setMenu] = useState(true);

	const showMenu = () => {
		setMenu(!menu);
	};

	const isAuthenticated = sessionStorage.getItem("token");

	return (
		<nav className="navbar">
			<div className="logo">
				<a href="#!">evero realtors</a>
			</div>
			<div className={menu ? "nav-links" : "nav-links show"}>
				<div className="nav-link">
					<Link
						to="header"
						spy={true}
						smooth={true}
						duration={2000}
						delay={500}
						onClick={() => showMenu()}
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
						onClick={() => showMenu()}
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
						onClick={() => showMenu()}
					>
						Apartments
					</Link>
				</div>
				<div className="nav-link">
					<Link
						to="works"
						spy={true}
						smooth={true}
						duration={2000}
						delay={500}
						onClick={() => showMenu()}
					>
						How It Works
					</Link>
				</div>
				<div className="nav-link">
					<Link
						to="agents"
						spy={true}
						smooth={true}
						duration={2000}
						delay={500}
						onClick={() => showMenu()}
					>
						Agents
					</Link>
				</div>
				<div className="nav-link">
					<Link
						to="contacts"
						spy={true}
						smooth={true}
						duration={2000}
						delay={500}
						onClick={() => showMenu()}
					>
						Contact Us
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
