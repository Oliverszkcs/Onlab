import React, { useState } from "react";
import axios from "axios";
import "./upload.css";
import { jwtDecode } from "jwt-decode";
import Navbar from "./Components/Header/Navbar";

function UploadProperty() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState("");
    const [bathroomNumber, setBathroomNumber] = useState("");
    const [bedroomNuamber, setBedroomNumber] = useState("");
    const [Area, setArea] = useState("");
    const [furnished, setFurnished] = useState(false);
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");

    const token = sessionStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const email = decodedToken.email;

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        console.log("Files selected:", selectedFiles);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!files) {
            setMessage("❌ Please select an image!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        files.forEach((file) => {
            formData.append("files", file);
        });
        formData.append("email", email);
        formData.append("bathroomNumber", bathroomNumber);
        formData.append("bedroomNumber", bedroomNuamber);
        formData.append("minimumArea", Area);
        formData.append("furnished", furnished);
        formData.append("location", location);
        formData.append("type", type);

        if (sessionStorage.getItem("token")) {
            try {
                await axios.post("http://localhost:8082/files/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                setMessage("✅ Upload successful!");
                console.log("Upload successful");

            } catch (error) {
                console.error("Upload error:", error);
                setMessage("❌ Upload failed! Please try again.");
            }
        }
    };

    return (
        <div className="upload-page">
            <Navbar />
        <div className="upload-form">
            <h2>Upload Property</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Property Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" required />
                </div>
                <div className="form-group">
                    <label>Price ($):</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Bathrooms:</label>
                    <input type="number" value={bathroomNumber} onChange={(e) => setBathroomNumber(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Bedrooms:</label>
                    <input type="number" value={bedroomNuamber} onChange={(e) => setBedroomNumber(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Area (m²):</label>
                    <input type="number" value={Area} onChange={(e) => setArea(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Furnished:</label>
                    <select value={furnished ? "Yes" : "No"} onChange={(e) => setFurnished(e.target.value === "Yes")}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Property Type:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="">Select type</option>
                        <option value="APARTMENT">Apartment</option>
                        <option value="HOUSE">Detached House</option>
                        <option value="STUDIO">Studio</option>
                        <option value="LOFT">Loft</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Upload Image:</label>
                    <input type="file" accept="image/*" multiple onChange={handleFileChange} required />
                </div>
                <button type="submit">Upload</button>
            </form>
            {message && (
                <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>
            )}
        </div>
        </div>
    );
}

export default UploadProperty;
