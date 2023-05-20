import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function RideRequestReceivedPage() {
    return(
        <div>
            <p>Your ride request has been received.</p>
            <Link to='/'>
                <Button variant="success"> Return Home </Button>
            </Link>
        </div>
    )
}

export default RideRequestReceivedPage;