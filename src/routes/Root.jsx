import { Outlet, Navigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import { useAuth } from "../hooks/useAuth";

function Root() {
    const {user} = useAuth()

    return (
        <div>
            <TopNav />
            <div className="mt-12 pt-2 min-h-dvh">
                <Outlet />
                {!user && <Navigate to='/login'/>}
            </div>
        </div>
      );
}

export default Root;