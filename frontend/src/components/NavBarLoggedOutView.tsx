import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onMemberLoginClicked: () => void,
}

const NavBarLoggedOutView = ({onMemberLoginClicked}: NavBarLoggedOutViewProps) => {
    return ( 
        <Button variant="outline-light" onClick={onMemberLoginClicked}>Log in</Button>
     );
}
 
export default NavBarLoggedOutView;