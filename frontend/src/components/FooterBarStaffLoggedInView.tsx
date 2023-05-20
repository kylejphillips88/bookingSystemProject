import { Button, Navbar } from "react-bootstrap";
import * as FunctionsApi from "../network/functions_api";
import { Staff } from "../models/staff";

interface FooterBarStaffLoggedInViewProps {
    staff: Staff,
    onLogoutSuccessful: () => void,
}

const FooterBarStaffLoggedInView = ({ staff, onLogoutSuccessful }: FooterBarStaffLoggedInViewProps) => {
    
    async function staffLogout() {
        try {
            await FunctionsApi.staffLogout();
            onLogoutSuccessful();        
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    
    return ( 
        <>
        <Navbar.Text className="me-2">
            Signed in as: {staff.email}
        </Navbar.Text>
        <Button variant="outline-light" onClick={staffLogout}>Log out</Button>
        </>
     );
}
 
export default FooterBarStaffLoggedInView;