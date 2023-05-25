import { Button, Container, Nav, Navbar } from "react-bootstrap";
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
                <Button className={`${styles.button1} ${styles.button}`}>
                    WHO ARE WE?
                </Button>
                <Button className={`${styles.button2} ${styles.button}`}>
                    WHAT WE DO
                </Button>
                <Button className={`${styles.button3} ${styles.button}`}>
                    OUR SERVICE
                </Button>
                <Button className={`${styles.button4} ${styles.button}`}>
                    SUPPORTERS
                </Button>
                <Button className={`${styles.button5} ${styles.button}`}>
                    GET IN TOUCH
                </Button>
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