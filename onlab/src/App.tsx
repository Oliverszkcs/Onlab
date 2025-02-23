import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRedirect from "./loginRedirect";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginRedirect />} />
            </Routes>
        </Router>
    );
};

export default App;