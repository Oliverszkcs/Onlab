    import React from "react";


    import { useEffect, useState } from "react";
    import { checkAuthStatus, logout } from "./AuthChecker";

    function App() {
        const [authStatus, setAuthStatus] = useState<{ authenticated: boolean; username?: string } | null>(null);

        useEffect(() => {
            const fetchStatus = async () => {
                const status = await checkAuthStatus();
                setAuthStatus(status);
            };

            fetchStatus();
        }, []);

        return (
            <div className="p-4">
                {authStatus?.authenticated ? (
                    <>
                        <h1>Welcome, {authStatus.username}!</h1>
                        <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
                    </>
                ) : (
                    <a href="http://localhost:8080/api/oauth2/authorization/keycloak" className="px-4 py-2 bg-blue-500 text-white rounded">
                        Login with Keycloak
                    </a>
                )}
            </div>
        );
    }

    export default App;