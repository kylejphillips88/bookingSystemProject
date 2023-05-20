import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Roster } from "../models/roster";
import { RosterInput } from "../network/functions_api";
import * as FunctionsApi from "../network/functions_api";
import TextInputField from "./form/TextInputField";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";


interface AddEditRosterDialogProps {
    rosterToEdit?: Roster,
    onDismiss: () => void,
    onRosterSaved: (roster: Roster) => void,
    
}

const AddEditRosterDialog = ({ rosterToEdit, onDismiss, onRosterSaved}: AddEditRosterDialogProps) => {
    
    const [times, setTimes] = useState<string[]>([]);
    const [newTime, setNewTime] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [statuses, setStatuses] = useState<string[]>([]);

    const { register, handleSubmit, formState : { errors, isSubmitting }, setValue } = useForm<RosterInput>();
        useEffect(() => {
            if (rosterToEdit) {
              const { date, driverName, vehiclePlate, startTime, finishTime } = rosterToEdit;
              setValue("date", date);
              setValue("driverName", driverName);
              setValue("vehiclePlate", vehiclePlate);
              setValue("startTime", startTime);
              setValue("finishTime", finishTime);
              setValue("availabilityTime", times);
              setValue("availabilityStatus", statuses);
            }
          }, [rosterToEdit, times, statuses, setValue]);

    async function onSubmit(input: RosterInput) {
        try {
            let rosterResponse: Roster;
            if (rosterToEdit){
                rosterResponse = await FunctionsApi.updateRoster(rosterToEdit._id, input);
            } else {
                rosterResponse = await FunctionsApi.createRoster(input);
            }
            onRosterSaved(rosterResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    { rosterToEdit ? "Edit Roster" : "Add Roster" }
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditRosterForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                    name="date"
                    label="Date"
                    type="date"
                    placeholder="Date"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={errors.date}
                    />
                    <TextInputField
                    name="driverName"
                    label="Driver's Name"
                    type="text"
                    placeholder="Driver's Name"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={errors.driverName}
                    />
                    <TextInputField
                    name="vehiclePlate"
                    label="Vehicle Plate No."
                    type="text"
                    placeholder="Vehicle Plate No."
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={errors.vehiclePlate}
                    />
                    <TextInputField
                    name="startTime"
                    label="Shift Start Time"
                    type="time"
                    placeholder="09:00"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={errors.startTime}
                    />
                    <TextInputField
                    name="finishTime"
                    label="Shift Finish Time"
                    type="time"
                    placeholder="14:30"
                    register={register}
                    registerOptions={{ required: "Required" }}
                    error={errors.finishTime}
                    />
                    <Form.Label><b>Shift Schedule</b></Form.Label>
                    <ol>{times.map((time) =>
                        <li key={time}>{time}</li>)}
                    </ol>
                    <Form.Group
                    >
                        <ol>{statuses.map((status) => 
                        <li key={status}>{status}</li>)}
                        </ol>
                    </Form.Group>
                    <Form.Group  controlId="availabilityTime">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                        type='time'
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        />
                        
                    </Form.Group>
                    <Form.Group controlId="availabilityStatus">
                        <Form.Label>Availability</Form.Label>
                        <Form.Select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        >
                            <option>Select availability type</option>
                            <option value={"Available"}>Available</option>
                            <option value={"Non-booking period"}>Non-booking period</option>
                            <option value={"Pickup Address"}>Pickup address</option>
                            <option value={"Driving"}>Driving</option>
                            <option value={"Destination Address"}>Destination address</option>
                        </Form.Select>
                    </Form.Group>
                    <Button 
                        onClick={() => {
                        setTimes([...times, newTime]);
                        setStatuses([...statuses, newStatus]);
                        } }>
                        <FaPlus/>
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                type="submit"
                form="addEditRosterForm"
                variant="success"
                disabled={isSubmitting}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditRosterDialog;