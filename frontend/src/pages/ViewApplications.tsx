import { useState, useEffect } from 'react';
import { Application as ApplicationModel } from '../models/application';
import Application from '../components/Application';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import styles from '../styles/ViewPage.module.css';
import * as FunctionsApi from '../network/functions_api';


function ViewApplications() {

    const [applications, setApplications] = useState<ApplicationModel[]>([]);
    const [applicationsLoading, setApplicationsLoading] = useState(true);
    const [showApplicationsLoadingError, setShowApplicationsLoadingError] = useState(false);

    useEffect(() => {
      async function loadApplications() {
        try {
          setShowApplicationsLoadingError(false);
          setApplicationsLoading(true);
          const applications = await FunctionsApi.fetchApplications();
          setApplications(applications);
        } catch (error) {
          console.error(error);
          setShowApplicationsLoadingError(true);
        } finally {
          setApplicationsLoading(false);
        }
      }
      loadApplications();
    }, []);

    async function deleteApplication(application: ApplicationModel) {
      try {
        await FunctionsApi.deleteApplication(application._id);
        setApplications(applications.filter(existingApplication => existingApplication._id !== application._id));
      } catch (error) {
        console.error(error);
        alert(error);
      }
      
    }

    const applicationsGrid =
    <Row xs={1} md= {2} xl={3} className={`g-4 ${styles.gridsView}`}>
    {applications.map(application => (
      <Col key={application._id}>
        <Application 
        application={application} 
        className={styles.display}
        onDeleteApplicationClicked={deleteApplication}
        />
      </Col>
    ))}
  </Row>


    return (
        <Container className={styles.viewDataPages}>
          {applicationsLoading && <Spinner animation='border' variant='success'/>}
          {showApplicationsLoadingError && <p>Something went wrong. Please refresh the page.</p>}
          {!applicationsLoading && !showApplicationsLoadingError &&
          <>
          { applications.length > 0
            ? applicationsGrid
            : <p>There are currently no applications pending.</p>
          }
          </>
          }
          
        </Container>
    )
}

export default ViewApplications;