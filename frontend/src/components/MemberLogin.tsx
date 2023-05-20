import { useForm } from "react-hook-form";
import { Member } from "../models/member";
import { MemberLoginCredentials } from "../network/functions_api";
import * as FunctionsApi from "../network/functions_api";
import { Button, Form, Modal } from "react-bootstrap";
import LoginInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import styles from "../styles/ViewPage.module.css"

interface MemberLoginModalProps {
    onDismiss:() => void,
    onMemberLoginSuccessful: (member: Member) => void,
}

const MemberLoginModal = ({onDismiss, onMemberLoginSuccessful}: MemberLoginModalProps) => {
    
    const { register, handleSubmit, formState: { errors, isSubmitting } }= useForm<MemberLoginCredentials>();

    async function onSubmit(credentials: MemberLoginCredentials) {
        try {
            const memberLoggedIn = await FunctionsApi.memberLogin(credentials);
            onMemberLoginSuccessful(memberLoggedIn);            
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

    return ( 
        <Modal show onHide={onDismiss} className={styles.viewDataPages}>
            <Modal.Header closeButton>
                <Modal.Title>Log in</Modal.Title>
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
                    >Log in
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
     );
}
 
export default MemberLoginModal;