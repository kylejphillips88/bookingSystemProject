import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ApplicationReceivedPage(){
    return(
    <div>
        <p>Thank you for your submission. We will contact you soon</p>
        <Link to='/'>
            <Button variant="success"> Return Home </Button>
        </Link>
    </div>
    )
}

export default ApplicationReceivedPage;