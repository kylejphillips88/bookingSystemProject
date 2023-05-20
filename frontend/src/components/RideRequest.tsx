import styles from "../styles/ViewDetail.module.css";
import { Card, Button } from "react-bootstrap";
import { RideRequest as RideRequestModel } from "../models/ride_request";
import { formatDate } from "../utils/formatDate";

interface RideRequestProps {
    rideRequest: RideRequestModel,
    onDeleteRideRequestClicked: (rideRequest: RideRequestModel) => void,
    className?: string,
}

const RideRequest = ({ rideRequest, onDeleteRideRequestClicked, className }: RideRequestProps) => {
    const {
        pickup,
        dest,
        passengers,
        wheelchair,
        additionalNotes,
        createdAt,
    } = rideRequest;

    return (
        <Card className={`${styles.displayFormat} ${className}`}>
            <Card.Body>
                <Card.Text className={styles.textFormat}>
                    <Card.Title><b>Ride Request</b></Card.Title>
                        Pickup Address: {pickup}<br/>
                        Destination Address: {dest}<br/>
                        Number of Passengers: {passengers}<br/>
                        Wheelchair Accessible Vehicle Required: {wheelchair}<br/>
                        Additional Information: {additionalNotes}<br/>
                        <Button
                        onClick={() => {
                            onDeleteRideRequestClicked(rideRequest);
                        }}
                        variant="success"
                        >Cancel Booking Request
                        </Button>
                </Card.Text>
            </Card.Body>
            <Card.Footer>Ride Request Submitted: {formatDate(createdAt)}</Card.Footer>
        </Card>
    )
}

export default RideRequest;