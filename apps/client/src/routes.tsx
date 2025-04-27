import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./protectedRoute";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />}></Route>
            </Route>
        </Routes>
    );
}
export default MainRoutes