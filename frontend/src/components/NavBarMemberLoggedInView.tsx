import { Button, Navbar } from "react-bootstrap";
import { Member } from "../models/member";
import * as FunctionsApi from "../network/functions_api";

interface NavBarMemberLoggedInViewProps {
    member: Member,
    onLogoutSuccessful: () => void,
}

const NavBarMemberLoggedInView = ({ member, onLogoutSuccessful }: NavBarMemberLoggedInViewProps) => {
    
    async function memberLogout() {
        try {
            await FunctionsApi.memberLogout();
            onLogoutSuccessful();        
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    
    return ( 
        <>
        <Navbar.Text className="me-2">
            Signed in as: {member.email}
        </Navbar.Text>
        <Button variant="outline-light" onClick={memberLogout}>Log out</Button>
        </>
     );
}
 
export default NavBarMemberLoggedInView;