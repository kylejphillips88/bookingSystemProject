import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/ViewPage.module.css"

const HomeLoggedOutView = () => {
    return (
        <div>
            <Container className={styles.viewDataPages}>
                <Link to='/applyformembership'>
                    <Button variant='outline-success'>
                        Apply for Membership
                    </Button>
                </Link>
            </Container>
        </div>
     );
}
 
export default HomeLoggedOutView;