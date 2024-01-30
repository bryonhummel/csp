import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import { AuthProvider } from "../hooks/useAuth";

function Root() {
    return (
        <div>
            <AuthProvider>
                <TopNav />
                <Outlet />
            </AuthProvider>
        </div>
      );
}

export default Root;