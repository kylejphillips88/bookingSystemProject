import { Form, Card, Button } from 'react-bootstrap';
import styles from '../styles/ViewDetail.module.css';
import { Application } from '../models/application';
import { useForm } from 'react-hook-form';
import { ApplicationInput } from '../network/functions_api';
import * as ApplicationApi from '../network/functions_api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ApplyForMembershipProps {

    onApplicationSaved: (application: Application) => void,
    
}

const ApplyForMembership = ({ onApplicationSaved }: ApplyForMembershipProps) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<ApplicationInput>();    

    async function onSubmit(input: ApplicationInput) {
        try {
            const applicationResponse = await ApplicationApi.createApplication(input);
            onApplicationSaved(applicationResponse);
            navigate('/applicationreceived');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return(
        
        <Card className={`${styles.displayFormat} ${styles.textFormat}`}>
            <Card.Title><b>Apply for Membership</b></Card.Title>
            <Card.Title><b>Personal Details</b></Card.Title>
            <Form id='applicationForm' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className='mb-3' controlId="fname">
                    <Form.Label>First name</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder='First Name'
                    isInvalid={!!errors.firstName}
                    {...register("firstName", { required: "Required"})}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.firstName?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId="lname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder='Last name'
                    isInvalid={!!errors.lastName}
                    {...register("lastName", { required: "Required"})}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.lastName?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId="dob">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control 
                    type='date'
                    isInvalid={!!errors.dob}
                    {...register("dob")}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.dob?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder='Address'
                    isInvalid={!!errors.address}
                    {...register("address", { required: "Required"})}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.address?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId="town">
                    <Form.Label>Town</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder='Town'
                    isInvalid={!!errors.town}
                    {...register("town", { required: "Required"})}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.town?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId="postcode">
                    <Form.Label>Postcode</Form.Label>
                    <Form.Control
                    placeholder='Postcode'
                    isInvalid={!!errors.postcode}
                    {...register("postcode", { required: "Required"})}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.postcode?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId="gender">
                    <Form.Label>What is your gender?</Form.Label>
                    <Form.Select 
                    aria-label='gender'
                    isInvalid={!!errors.gender}
                    {...register("gender", { required: "Required"})}
                    >
                        <option>Select your gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Non-Binary'>Non-Binary</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        {errors.gender?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId="ethnicity">
                    <Form.Label>How would you describe your ethnicity?</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder='Ethnicity'
                    isInvalid={!!errors.ethnicity}
                    {...register("ethnicity", { required: "Required"})}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.ethnicity?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Card.Title><b>Contact Details</b></Card.Title>
                <Form.Group className='mb-3' controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type='email' 
                    placeholder='Email'
                    isInvalid={!!errors.emailAddress}
                    {...register("emailAddress", { required: "Required"})}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.emailAddress?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId="phone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control 
                    placeholder='Phone number'
                    isInvalid={!!errors.phoneNumber}
                    {...register("phoneNumber", { required: "Required"})}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.phoneNumber?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId="altPhone">
                    <Form.Label>Secondary phone number (Optional)</Form.Label>
                    <Form.Control 
                    placeholder='Secondary phone number'
                    {...register("altPhoneNumber")}
                    />
                </Form.Group>
                <Card.Title><b>Health Conditions</b></Card.Title>
                <Form.Group className='mb-3' controlId='disability'>
                    <Form.Label>Do you suffer from any disabilities?</Form.Label>
                    <div 
                    key='inline'
                    >
                    <Form.Check
                    inline
                    type={'radio'}
                    value={"yes"}
                    label={'Yes'}
                    {...register("disability", {required: "Required"})}
                    />
                    <Form.Check
                    inline
                    type={'radio'}
                    value={"no"}
                    label={'No'}
                    {...register("disability", {required: "Required"})}
                    />
                    </div>
                    </Form.Group>
                <Form.Group className='mb-3' controlId="disabilityDetails" >
                    <Form.Label>If yes then please provide brief details of your disability and any assistance requirements that you may have.</Form.Label>
                    <Form.Control 
                    as='textarea' 
                    rows={4}
                    {...register("disabilityDetails")}
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId="additionalInfo">
                    <Form.Label>Are there any other health conditions that we should be aware of?</Form.Label>
                    <Form.Control 
                    as='textarea' 
                    rows={4}
                    {...register("otherHealthConditions")}
                    />
                </Form.Group>
                <Card.Title><b>Emergency Contact Details</b></Card.Title>
                <Form.Group className='mb-3' controlId='emergencyName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Name'
                    isInvalid={!!errors.emergencyName}
                    {...register("emergencyName", {required:"Required"})}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.emergencyName?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId='emergencyPhone'>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                    placeholder='Phone number'
                    isInvalid={!!errors.emergencyPhone}
                    {...register("emergencyPhone", {required:"Required"})}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.emergencyPhone?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId='emergencyRelationship'>
                    <Form.Label>Relationship to you</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Relationship to you'
                    isInvalid={!!errors.emergencyRelationship}
                    {...register("emergencyRelationship", {required:"Required"})}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.emergencyRelationship?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                </Form>
            <Card.Footer>
                <Button 
                type='submit'
                form='applicationForm'
                disabled={isSubmitting}
                variant='success'
                >
                Submit
                </Button>
            </Card.Footer>
            
        </Card>
        
    )
}

export default ApplyForMembership;