import { Card } from "react-bootstrap";
import { Roster as RosterModel } from "../models/roster";
import styles from "../styles/ViewDetail.module.css";
import { formatDate } from "../utils/formatDate";
import { formatDateTime } from "../utils/formatDate";


interface RosterProps {
    roster: RosterModel,
    className?: string,
    onRosterClicked: (roster: RosterModel) => void,
}


const Roster = ({ roster, className, onRosterClicked }: RosterProps) => {
    const {
        date,
        driverName,
        vehiclePlate,
        startTime,
        finishTime,
        availabilityTime,
        availabilityStatus,
        createdAt,
        updatedAt
    } = roster;

    let createdUpdatedRoster: string;
    if (updatedAt > createdAt) {
        createdUpdatedRoster = "Roster Updated: " + formatDateTime(updatedAt);
    } else {
        createdUpdatedRoster = "Roster Created: " + formatDateTime(createdAt);
    }



    return (
        <Card className={styles.displayFormat}
        onClick={() => onRosterClicked(roster)}>
            <Card.Body>
                <Card.Title>
                    <b>Roster</b><br/>
                    <b>{formatDate(date)}</b>
                </Card.Title>
                Driver: {driverName}<br/>
                Vehicle: {vehiclePlate}<br/>
                Start Time: {startTime}<br/>
                Finish Time: {finishTime}<br/>
                Roster Schedule:<br/>
                Time:
                <ol> 
                {availabilityTime.map((inputTime) => 
                    <li key={inputTime}>{inputTime}</li>)}<br/>
                </ol>
                Availability:
                <ol>
                {availabilityStatus.map((inputStatus) => 
                    <li key={inputStatus}>{inputStatus}</li>)}
                </ol>
            </Card.Body>
            <Card.Footer>
            {createdUpdatedRoster}
            </Card.Footer>
        </Card>
    )
}

export default Roster;