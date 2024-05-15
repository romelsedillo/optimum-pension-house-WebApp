import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import UpdateReservation from "../../../utils/UpdateReservation";
import { toast } from "react-hot-toast";
import RoomOccupied from "../../../utils/UpdateFunctions/RoomOccupied";
import CreateNotification from "../../../utils/Notifications/CreateNotification";
import ReservationCollection from "../../../utils/Collections/ReservationCollection";
import { getCurrentDateTime } from "../../../utils/CurrentDayTime";

const UpdateReservationModal = ({ reservationId, onUpdateSuccess, roomId }) => {
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const appWriteData = await ReservationCollection();
      setData(appWriteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reservationData = data.filter((item) => item.id === reservationId);

  const guestId = reservationData[0]?.guestId;
  console.log(guestId);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDateTime = getCurrentDateTime();
    try {
      toast.promise(UpdateReservation(reservationId, status), {
        loading: "Updating...",
        success: <b>Reservation updated.</b>,
        error: <b>Update failed.</b>,
      });
      if (status === "canceled") {
        const status = "available";
        RoomOccupied(roomId, status);
        const message = "Booking canceled.";
        const type = "cancel";
        CreateNotification(
          message,
          type,
          currentDateTime,
          guestId,
          reservationId
        );
      }
      if (status === "confirmed") {
        const status = "occupied";
        RoomOccupied(roomId, status);
        const message = "Booking confirmed.";
        const type = "confirmed";
        CreateNotification(
          message,
          type,
          currentDateTime,
          guestId,
          reservationId
        );
      }
      if (status === "check-in") {
        const message = "Check-in.";
        const type = "check-in";
        CreateNotification(
          message,
          type,
          currentDateTime,
          guestId,
          reservationId
        );
      }
      if (status === "check-out") {
        const message = "Check-out.";
        const type = "check-out";
        CreateNotification(
          message,
          type,
          currentDateTime,
          guestId,
          reservationId
        );
      }
      onUpdateSuccess();
      console.log(status);

    } catch (error) {
      console.log("Status:", status);
      toast.error(`Error updating reservation: ${error.message}`);
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
              label="Update Status"
              name="status"
              size="sm"
              variant="bordered"
              className="w-full"
              color="success"
              value={status}
              onChange={handleStatusChange}
            >
              <SelectItem
                key="confirmed"
                value="confirmed"
                className="text-blue-500 hover:text-blue-500"
              >
                Confirmed
              </SelectItem>
              <SelectItem
                key="canceled"
                value="canceled"
                className="text-red-500"
              >
                Cancel
              </SelectItem>
              <SelectItem
                key="check-in"
                value="check-in"
                className="text-green-400"
              >
                CHeck-in
              </SelectItem>
              <SelectItem
                key="check-out"
                value="check-out"
                className="text-green-400"
              >
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
