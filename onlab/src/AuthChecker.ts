import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

export const checkAuthStatus = async () => {
    const response = await api.get("/auth/status");
    return response.data;
};

export const logout = async () => {
    await api.post("/auth/logout");
};

export const fetchUserInfo = async () => {
    const response = await api.get("/auth/me");
    return response.data;
};
