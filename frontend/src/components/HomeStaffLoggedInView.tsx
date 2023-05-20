import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeStaffLoggedInView = () => {
    return (
        <> 
        <Link to='/viewapplications'>
            <Button variant='outline-success'>
                View Applications
            </Button>
        </Link>
        <Link to='/viewriderequests'>
            <Button variant='outline-success'>
                View Ride Requests
            </Button>
        </Link>
        <Link to='/viewrosters'>
            <Button variant='outline-success'>
                View Volunteer Roster
            </Button>
        </Link>
        </>
     );

}
 
export default HomeStaffLoggedInView;