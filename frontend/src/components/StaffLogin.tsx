import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";
import { Staff } from "../models/staff";
import { StaffLoginCredentials } from "../network/functions_api";
import * as FunctionsApi from "../network/functions_api";
import LoginInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css"

interface StaffLoginModalProps {
    onDismiss: () => void,
    onStaffLoginSuccessful: (staff: Staff) => void,
}

const StaffLoginModal = ({onDismiss, onStaffLoginSuccessful}: StaffLoginModalProps) => {
    
    const { register, handleSubmit, formState: { errors, isSubmitting } }= useForm<StaffLoginCredentials>();
    
    async function onSubmit(credentials: StaffLoginCredentials) {
        try {
            const staffLoggedIn = await FunctionsApi.staffLogin(credentials);
            onStaffLoginSuccessful(staffLoggedIn);            
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

    return ( 
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>Staff Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <LoginInputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Email"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.email}
                />
                <LoginInputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.password}
                />
                <Button
                variant="success"
                type="submit"
                disabled={isSubmitting}
                className={styleUtils.width100}
                >Log in</Button>
            </Form>
        </Modal.Body>
    </Modal>
 );
}
 
export default StaffLoginModal;