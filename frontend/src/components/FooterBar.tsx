import { Container, Nav, Navbar } from "react-bootstrap";
import { Staff } from "../models/staff";
import FooterBarStaffLoggedInView from "./FooterBarStaffLoggedInView";
import FooterBarLoggedOutView from "./FooterBarLoggedOutView";

interface FooterBarProps {
    loggedInStaff: Staff | null,
    onStaffLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const FooterBar = ({loggedInStaff, onStaffLoginClicked, onLogoutSuccessful}: FooterBarProps) => {
    return (
        <Navbar bg="success" variant="dark" expand="lg" fixed="bottom">
            <Container>
                    <Nav className="ms-auto">
                        { loggedInStaff
                        ? <FooterBarStaffLoggedInView staff={loggedInStaff} onLogoutSuccessful={onLogoutSuccessful} />
                        : <FooterBarLoggedOutView onStaffLoginClicked={onStaffLoginClicked} />
                        }
                    </Nav>
            </Container>
        </Navbar>
    );
}

export default FooterBar;