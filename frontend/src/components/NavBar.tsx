import { Container, Nav, Navbar } from "react-bootstrap";
import { Member } from "../models/member";
import styles from "../styles/navbar.module.css"
import NavBarMemberLoggedInView from "./NavBarMemberLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

interface NavBarProps {
    loggedInMember: Member | null,
    onMemberLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({loggedInMember, onMemberLoginClicked, onLogoutSuccessful}: NavBarProps) => {
    return (
        <Navbar bg="success" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    <img src="/web-ctlogo.png" alt="Waka Eastern Bay Community Transport" className={styles.brandImage}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        { loggedInMember 
                        ? <NavBarMemberLoggedInView member={loggedInMember} onLogoutSuccessful={onLogoutSuccessful} />
                        : <NavBarLoggedOutView onMemberLoginClicked={onMemberLoginClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;