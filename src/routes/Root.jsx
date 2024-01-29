import { Link } from "react-router-dom";

function Root() {
    return (
        <div>
            <div>Hello Root</div>
            <Link to={`swaps`}>Swaps</Link>
        </div>
      );
}

export default Root;