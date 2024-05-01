import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { updateReservation } from "../../../utils/UpdateReservation";
import { toast } from "react-hot-toast";
import RoomUnavailable from "../../../utils/UpdateFunctions/RoomUnavailable";

const UpdateReservationModal = ({ reservationId, onUpdateSuccess, roomId }) => {
  const [status, setStatus] = useState("");

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // try {
    //   toast.promise(updateReservation(reservationId, status), {
    //     loading: "Updating...",
    //     success: <b>Reservation updated.</b>,
    //     error: <b>Update failed.</b>,
    //   });
    //   RoomUnavailable(roomId);
    //   onUpdateSuccess();
    // } catch (error) {
    //   console.log("Status:", status);
    //   toast.error(`Error updating reservation: ${error.message}`);
    // }

    if (status === "cancel") {
      console.log("booking cancel");
    }
    if (status === "confirmed") {
      console.log("booking confirmed");
    }
  
  };

  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1 text-blue-500">
            Update Status
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
              <SelectItem key="confirmed" value="confirmed" className="text-blue-500 hover:text-blue-500">
                Confirmed
              </SelectItem>
              <SelectItem key="cancel" value="cancel" className="text-red-500">
                Cancel
              </SelectItem>
              <SelectItem key="check-in" value="check-in" className="text-green-400">
                CHeck-in
              </SelectItem>
              <SelectItem key="check-out" value="check-out" className="text-green-400">
                Check-out
              </SelectItem>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" size="sm" onPress={onClose}>
              Close
            </Button>
            <Button type="submit" color="primary" size="sm" onPress={onClose}>
              Update Status
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default UpdateReservationModal;
