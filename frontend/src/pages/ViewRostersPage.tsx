import { useState, useEffect } from 'react';
import { Roster as RosterModel } from '../models/roster';
import * as FunctionsApi from '../network/functions_api';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import Roster from '../components/Roster';
import styles from '../styles/ViewPage.module.css';
import AddEditRosterDialog from '../components/AddEditRosterDialog';
import { FaPlus } from 'react-icons/fa';


function ViewRostersPage() {

    const [rosters, setRosters] = useState<RosterModel[]>([]);
    const [rostersLoading, setRostersLoading] = useState(true);
    const [showRostersLoadingError, setShowRostersLoadingError] = useState(false);

    const [showAddRosterDialog, setShowAddRosterDialog] = useState(false);
    const [rosterToEdit, setRosterToEdit] = useState<RosterModel|null>(null);

    useEffect(() => {
        async function loadRosters() {
            try {
                setShowRostersLoadingError(false);
                setRostersLoading(true);
                const rosters = await FunctionsApi.fetchRosters();
                setRosters(rosters);
            } catch (error) {
                console.error(error);
                setShowRostersLoadingError(true);
            } finally {
                setRostersLoading(false);
            }
        }
        loadRosters();
    }, []);

    const rostersGrid = 
    <Row xs={1} md= {2} xl={3} className={`g-4 ${styles.gridsView}`}>
        {rosters.map(roster => (
            <Col key={roster._id}>
                <Roster
                roster={roster}
                className={styles.display}
                onRosterClicked={setRosterToEdit}
                />
            </Col>
        ))}
    </Row>

    return (
        <>
        <Button
        className={`mb-4`}
        variant='success'
        onClick={() => setShowAddRosterDialog(true)}>
            <FaPlus/>
            Add a new roster
        </Button>
        <Container className={styles.viewDataPages}>
            {rostersLoading && <Spinner animation='border' variant='success'/>}
            {showRostersLoadingError && <p>Something went wrong. Please refresh or go back.</p>}
            {!rostersLoading && !showRostersLoadingError &&
            <>
            { rosters.length > 0
                ?rostersGrid
                :<p>There are no upcoming rosters logged.</p>
            }
            </>
            }
            { showAddRosterDialog &&
                <AddEditRosterDialog
                onDismiss={() => setShowAddRosterDialog(false)}
                onRosterSaved={(newRoster) => {
                    setRosters([...rosters, newRoster])
                    setShowAddRosterDialog(false);
                }}
                />
            }
            { rosterToEdit &&
                <AddEditRosterDialog
                rosterToEdit={rosterToEdit}
                onDismiss={() => setRosterToEdit(null)}
                onRosterSaved={(updatedRoster) => {
                    setRosters(rosters.map(existingRoster => existingRoster._id === updatedRoster._id ? updatedRoster : existingRoster))
                    setRosterToEdit(null);
                }}
                />
            }
        </Container>
        </>
    );
}

export default ViewRostersPage