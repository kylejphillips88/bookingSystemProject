import { useState, useEffect } from 'react';
import * as FunctionsApi from '../network/functions_api';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom'
import { Button, Container, ModalFooter } from 'react-bootstrap';
import MemberLoginModal from '../components/MemberLogin';
import StaffLoginModal from '../components/StaffLogin';
import { Member } from '../models/member';
import { Staff } from '../models/staff';
import HomeMemberLoggedInView from '../components/HomeMemberLoggedInView';
import styles from '../styles/ViewPage.module.css'
import HomeLoggedOutView from '../components/HomeLoggedOutView';
import FooterBar from '../components/FooterBar';
import HomeStaffLoggedInView from '../components/HomeStaffLoggedInView';

function Home(){
    
    const [loggedInMember, setLoggedInMember] = useState<Member|null>(null);
    const [loggedInStaff, setLoggedInStaff] = useState<Staff|null>(null)
    const [showMemberLoginModal, setShowMemberLoginModal] = useState(false);
    const [showStaffLoginModal, setShowStaffLoginModal] = useState(false);
  
    useEffect(() => {

      async function fetchLoggedInStaff() {
        try {
          const staff = await FunctionsApi.getLoggedInStaff();
          setLoggedInStaff(staff);
        } catch (error) {
          console.error(error);
        }
      }

      async function fetchLoggedInMember() {
        try {
          const member = await FunctionsApi.getLoggedInMember();
          setLoggedInMember(member);
        } catch (error) {
          console.error(error);
        }
      }
      fetchLoggedInStaff();
      fetchLoggedInMember();
    }, []);

  
  

    return(
        <div>
        <NavBar
        loggedInMember={loggedInMember}
        onMemberLoginClicked={() => setShowMemberLoginModal(true)}
        onLogoutSuccessful={() => setLoggedInMember(null)}
        />
        <Container className={styles.viewDataPages}>
            {loggedInMember
                ? <HomeMemberLoggedInView/>
                : <HomeLoggedOutView/>
            }
        </Container>
        <Container className={styles.viewDataPages}>
          {loggedInStaff
            ?<HomeStaffLoggedInView/>
            : null
          }
        
        </Container>
            {showMemberLoginModal &&
                <MemberLoginModal
                onDismiss={() => setShowMemberLoginModal(false)}
                onMemberLoginSuccessful={(member) => {
                  setLoggedInMember(member);
                  setShowMemberLoginModal(false);
                } }
                />
        }
        <FooterBar
        loggedInStaff={loggedInStaff}
        onStaffLoginClicked={() => setShowStaffLoginModal(true)}
        onLogoutSuccessful={() => setLoggedInStaff(null)}
        />
          {showStaffLoginModal &&
            <StaffLoginModal
            onDismiss={() => setShowStaffLoginModal(false)}
            onStaffLoginSuccessful={(staff) => {
            setLoggedInStaff(staff);
            setShowStaffLoginModal(false);
            } }
            />
          }
        </div>
        
    );
}

export default Home;