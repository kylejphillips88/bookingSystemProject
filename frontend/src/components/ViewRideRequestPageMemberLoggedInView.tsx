import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from "react-bootstrap";
import RideRequest from '../components/RideRequest';
import { RideRequest as RideRequestModel } from '../models/ride_request';
import * as FunctionsApi from '../network/functions_api';
import styles from '../styles/ViewPage.module.css';

const ViewRideRequestPageMemberLoggedInView = () => {

    const [rideRequests, setRideRequests] = useState<RideRequestModel[]>([]);
    const [rideRequestsLoading, setRideRequestsLoading] = useState(true);
    const [showRideRequestsLoadingError, setShowRideRequestsLoadingError] = useState(false);

    useEffect(() => {
        async function loadRideRequests() {
          try {
            setShowRideRequestsLoadingError(false);
            setRideRequestsLoading(true);
            const rideRequests = await FunctionsApi.fetchRideRequests();
            setRideRequests(rideRequests);
          } catch (error) {
            console.error(error);
            setShowRideRequestsLoadingError(true);
          } finally {
            setRideRequestsLoading(false);
          }
        }
        loadRideRequests();
      }, []);

    async function deleteRideRequest(rideRequest: RideRequestModel) {
        try {
          await FunctionsApi.deleteRideRequest(rideRequest._id);
          setRideRequests(rideRequests.filter(existingRideRequest => existingRideRequest._id !== rideRequest._id))
        } catch (error) {
          console.error(error);
          alert(error);
        }
      }
  
      const rideRequestGrid = 
        <Row xs={1} md= {2} xl={3} className={`g-4 ${styles.gridsView}`}>
        {rideRequests.map(rideRequest => (
          <Col key={rideRequest._id}>
            <RideRequest 
            rideRequest={rideRequest} 
            className={styles.display}
            onDeleteRideRequestClicked={deleteRideRequest}
            />
          </Col>
        ))}
        </Row>

    return (
        <>
        {rideRequestsLoading && <Spinner animation='border' variant='success'/>}
        {showRideRequestsLoadingError && <p>Something went wrong. Please refresh the page.</p>}
        {!rideRequestsLoading && !showRideRequestsLoadingError &&
        <>
        { rideRequests.length > 0
        ? rideRequestGrid
        : <p>There are currently no ride requests pending.</p>
        }
          </>
          }
        
        </>

    );
}

export default ViewRideRequestPageMemberLoggedInView;