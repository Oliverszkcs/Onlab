import { useEffect, useState } from "react";
import { fetchUserInfo } from "./AuthChecker";

interface UserInfo {
    username: string;
    roles: string[];
}

const UserProfile = () => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const data = await fetchUserInfo();
                setUser(data);
            } catch (error) {
                setUser(null); // Not logged in
            } finally {
                setLoading(false);
            }
        };

        getUserInfo();
    }, []);

    if (loading) return <p>Loading...</p>;

    return user ? (
        <div className="p-4 border rounded shadow-md max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Roles:</strong> {user.roles.join(", ")}</p>
        </div>
    ) : (
        <div className="text-center">
            <p className="text-red-500">You are not logged in.</p>
            <a
                href="http://localhost:8080/api/oauth2/authorization/keycloak"
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Login with Keycloak
            </a>
        </div>
    );
};

export default UserProfile;
