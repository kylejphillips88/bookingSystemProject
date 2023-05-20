import { Button } from "react-bootstrap";

interface FooterBarLoggedOutViewProps {
    onStaffLoginClicked: () => void,
}

const FooterBarLoggedOutView = ({onStaffLoginClicked}: FooterBarLoggedOutViewProps) => {
    return ( 
        <Button variant="outline-light" onClick={onStaffLoginClicked}>Staff Log in</Button>
     );
}
 
export default FooterBarLoggedOutView;