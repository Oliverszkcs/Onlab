import React, { useState } from "react";
import axios from "axios";
import "./upload.css";
import {jwtDecode} from "jwt-decode";

function UploadProperty() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const token=sessionStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const email = decodedToken.email;

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        console.log("File selected:", selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted with values:", { name, description, price, file });

        if (!file) {
            setMessage("❌ Please select an image!");
            console.log("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("file", file);
        formData.append('email',email)

        if(sessionStorage.getItem("token")) {
        try {
            await axios.post("http://localhost:8082/files/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setMessage("✅ Upload successful!");
            console.log("Upload successful");

            const pictures = new FormData();
            const token = sessionStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const email = decodedToken.email
            pictures.append("file", file);
            pictures.append("email", email);

            console.log("Pictures updated for user");

        } catch (error) {
            console.error("Upload error:", error);
            setMessage("❌ Upload failed! Please try again.");
        }
    }};

    return (
        <div className="upload-form">
            <h2>Upload Property</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Property Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter property name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter property description"
                        rows="3"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price ($):</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Upload Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Upload</button>
            </form>
            {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}
        </div>
    );
}

export default UploadProperty;
