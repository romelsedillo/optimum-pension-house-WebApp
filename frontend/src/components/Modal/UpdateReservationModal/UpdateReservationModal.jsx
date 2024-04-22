import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import Swal from "sweetalert2";
import { Select, SelectItem } from "@nextui-org/react";
import { updateReservation } from "../../../utils/UpdateReservation";

const UpdateReservationModal = ({ reservationId }) => {
  const [status, setStatus] = useState("");

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateReservation(reservationId, status);
    console.log("Status:", status);
  };

  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Edit Status
          </ModalHeader>
          <ModalBody>
            <Select
              label="Edit Status"
              name="status"
              size="sm"
              variant="bordered"
              className="w-full"
              color="success"
              value={status}
              onChange={handleStatusChange}
            >
              <SelectItem key="pending" value="pending">
                Pending
              </SelectItem>
              <SelectItem key="confirmed" value="confirmed">
                Confirmed
              </SelectItem>
              <SelectItem key="check-in" value="check-in">
                CHeck-in
              </SelectItem>
              <SelectItem key="check-out" value="check-out">
                check-out
              </SelectItem>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" size="md" onPress={onClose}>
              Close
            </Button>
            <Button type="submit" color="primary" size="md" onPress={onClose}>
              Change Status
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default UpdateReservationModal;
