import { Card, Form, Button } from "react-bootstrap";
import styles from '../styles/ViewDetail.module.css';
import { Member } from "../models/member";
import { RideRequest } from "../models/ride_request";
import { useForm } from 'react-hook-form';
import { RideRequestInput } from "../network/functions_api";
import * as RideRequestApi from "../network/functions_api";
import { useNavigate } from "react-router-dom";

interface RequestARideProps {

    onRequestSaved: (rideRequest: RideRequest) => void,

}

const RequestARide = ({ onRequestSaved }: RequestARideProps) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<RideRequestInput>();

    async function onSubmit(input: RideRequestInput) {
        try {
            const rideRequestResponse = await RideRequestApi.createRideRequest(input);
            onRequestSaved(rideRequestResponse);
            navigate('/riderequestreceived');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (

        <Card className={`${styles.displayFormat} ${styles.textFormat}`}>
            <Card.Title><b>Request a Ride</b></Card.Title>
            <Form id='rideRequestForm' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className='mb-3' controlId="pickup">
                    <Form.Label>Pickup Address</Form.Label>
                    <Form.Control
                        type='text'
                        defaultValue={"Member address"}
                        isInvalid={!!errors.pickup}
                        {...register("pickup", { required: "Required" })}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.pickup?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId="dest">
                    <Form.Label>Destination Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Where do you want to go?'
                        isInvalid={!!errors.dest}
                        {...register("dest", { required: "Required" })}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.dest?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId='wheelchair'>
                    <Form.Label>Do you require a wheelchair accessible vehicle to travel?</Form.Label>
                    <div
                        key='inline'
                    >
                        <Form.Check
                            inline
                            type={'radio'}
                            value={'true'}
                            label={'Yes'}
                            {...register("wheelchair", { required: "Required" })}
                        />
                        <Form.Check
                            inline
                            type={'radio'}
                            value={"false"}
                            label={'No'}
                            {...register("wheelchair", { required: "Required" })}
                        />
                    </div>
                </Form.Group>
                <Form.Group className='mb-3' controlId="passengers">
                    <Form.Label>How many passengers are travelling including yourself?</Form.Label>
                    <Form.Control
                        type='number'
                        defaultValue={1}
                        isInvalid={!!errors.passengers}
                        {...register("passengers", { required: "Required" })}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.passengers?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId="additionalNotes">
                    <Form.Label>Additional notes for driver</Form.Label>
                    <Form.Control
                        as='textarea'
                        placeholder="ie. beware of dog, need assistance leaving house"
                        rows={4}
                        {...register("additionalNotes")}
                    />
                </Form.Group>
            </Form>
            <Card.Footer>
                <Button
                    type='submit'
                    form='rideRequestForm'
                    disabled={isSubmitting}
                    variant='success'
                >
                    Submit
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default RequestARide;