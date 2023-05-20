import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeMemberLoggedInView = () => {
    return (
        <>
        <Link to='/viewriderequests'>
            <Button variant='outline-success'>
                View Ride Requests
            </Button>
        </Link>
        <Link to='/requestaride'>
            <Button variant='outline-success'>
                Request a Ride
            </Button>
        </Link>
        </>
    );

}

export default HomeMemberLoggedInView;