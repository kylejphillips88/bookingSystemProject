import { useForm } from "react-hook-form";
import { Member } from "../models/member";
import { SignUpMemberCredentials } from "../network/functions_api";
import * as FunctionsApi from "../network/functions_api";
import { Form, Modal } from "react-bootstrap";

interface SignUpMemberModalProps {
    onDismiss: () => void,
    onSignUpSuccessful: (member: Member) => void,
}

const SignUpMemberModal = ({onDismiss, onSignUpSuccessful}: SignUpMemberModalProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpMemberCredentials>();    
    
    async function onSubmit(credentials: SignUpMemberCredentials) {
        try {
            const newMember = await FunctionsApi.signUpMember(credentials);
            onSignUpSuccessful(newMember);
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                Sign Up Member
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className='mb-3' controlId="fname">
                    <Form.Label>First name</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder='First Name'
                    isInvalid={!!errors.name}
                    {...register("name", { required: "Required"})}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                
                </Form>
            </Modal.Body>
        </Modal>
     );
}
 
export default SignUpMemberModal;