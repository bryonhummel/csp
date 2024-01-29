import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";

function Root() {
    return (
        <div>
            <TopNav />
            <Outlet />
        </div>
      );
}

export default Root;