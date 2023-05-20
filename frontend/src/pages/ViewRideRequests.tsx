import { useState, useEffect } from 'react';
import { RideRequest as RideRequestModel } from '../models/ride_request';
import RideRequest from '../components/RideRequest';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import styles from '../styles/ViewPage.module.css';
import * as FunctionsApi from '../network/functions_api';
import { Member } from '../models/member';
import NavBar from '../components/NavBar';
import ViewRideRequestPageMemberLoggedInView from '../components/ViewRideRequestPageMemberLoggedInView';
import ViewRideRequestLoggedOutView from '../components/ViewRideRequestLoggedOutView';
import MemberLoginModal from '../components/MemberLogin';


function ViewRideRequests() {
    const [loggedInMember, setLoggedInMember] = useState<Member|null>(null);

    const [showLoginModal, setShowLoginModal] = useState(false);
  
    useEffect(() => {
      async function fetchLoggedInMember() {
        try {
          const member = await FunctionsApi.getLoggedInMember();
          setLoggedInMember(member);
        } catch (error) {
          console.error(error);
        }
      }
      fetchLoggedInMember();
    }, []);

    return (
      <div>
        <NavBar
        loggedInMember={loggedInMember}
        onMemberLoginClicked={() => setShowLoginModal(true)}
        onLogoutSuccessful={() => setLoggedInMember(null)}
        />
        <Container className={styles.viewDataPages}>
          {loggedInMember
          ? <ViewRideRequestPageMemberLoggedInView/>
          : <ViewRideRequestLoggedOutView/>
          }
        </Container>
        {showLoginModal &&
                <MemberLoginModal
                onDismiss={() => setShowLoginModal(false)}
                onMemberLoginSuccessful={(member) => {
                  setLoggedInMember(member);
                } }
                />
        }
        </div>
    );
}

export default ViewRideRequests;