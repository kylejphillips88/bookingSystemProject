import styles from "../styles/ViewDetail.module.css";
import { Card, Button } from "react-bootstrap";
import { Application as ApplicationModel } from "../models/application";
import { formatDate } from "../utils/formatDate";

interface ApplicationProps {
    application: ApplicationModel,
    onDeleteApplicationClicked: (application: ApplicationModel) => void,
    className?: string,
}

const Application = ({ application, onDeleteApplicationClicked, className }: ApplicationProps) => {
    const {
        firstName,
        lastName,
        dob,
        address,
        town,
        postcode,
        phoneNumber,
        altPhoneNumber,
        emailAddress,
        gender,
        ethnicity,
        disability,
        disabilityDetails,
        otherHealthConditions,
        emergencyName,
        emergencyPhone,
        emergencyRelationship,
        createdAt,

    } = application;

    return (
        <Card className= {`${styles.displayFormat} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Text className={styles.textFormat}>
                    <Card.Title>
                    <b>Application</b>
                    </Card.Title>
                    Name: {firstName} {lastName}<br/>
                    Date of Birth: {dob}<br/>
                    Address: {address}, {town} {postcode}<br/>
                    Email Address: {emailAddress}<br/>
                    Phone Number: {phoneNumber}<br/>
                    Additional Phone Number: {altPhoneNumber}<br/>
                    Gender: {gender}<br/>
                    Ethnicity: {ethnicity}<br/>
                    Disabled: {disability}<br/>
                    Disability Details: {disabilityDetails}<br/>
                    Other Health Conditions: {otherHealthConditions}<br/>
                    <Card.Title><b>Emergency Contact Details</b></Card.Title>
                    Contact Name: {emergencyName}<br/>
                    Phone Number: {emergencyPhone}<br/>
                    Relationship: {emergencyRelationship}<br/>
                    <Button
                        variant="success">
                        Approve
                    </Button> 
                    <Button 
                    onClick={() => {
                        onDeleteApplicationClicked(application);
                    }}
                    variant="danger">
                        Reject
                    </Button>
                </Card.Text>
            </Card.Body>
            <Card.Footer>Application submitted: {formatDate(createdAt)} </Card.Footer>
        </Card>
    )
}

export default Application;