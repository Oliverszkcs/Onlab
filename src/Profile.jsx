import React, { useState, useEffect } from "react";
import "./profile.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Profile = () => {
    const [pictureName, setPictureName] = useState(null);

    const token = sessionStorage.getItem("token");
    const dekodedToken = jwtDecode(token);
    const username = dekodedToken.preferred_username || dekodedToken.sub;
    const email = dekodedToken.email || "No email available";

    useEffect(() => {
        axios.post(`http://localhost:8082/users/getPictures/${email}`)
            .then((response) => {
                console.log(response.data);
                setPictureName(response.data);
            })
            .catch((error) => {
                console.error("Error fetching image", error);
            });
    }, [email]);

    return (
        <div className="col-md-4">
            <div className="four columns">
                <a href="#">
                    <div className="content-box color-effect-1">
                        <h3>{username}</h3>

                        <div className="box-icon-wrap box-icon-effect-1 box-icon-effect-1a">
                            <div className="box-icon">
                                {pictureName ? (
                                    <img
                                        src={`http://localhost:9000/pictures/${pictureName}`}
                                        alt="Profile"
                                        className="profile-image"
                                    />
                                ) : (
                                    <i className="fa fa-user"></i>
                                )}
                            </div>
                        </div>

                        <p>{email}</p>

                        <button
                            onClick={() => {
                                sessionStorage.removeItem("token");
                                window.location.href = "/";
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Profile;
