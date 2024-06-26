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
import AddReports from "../../../utils/AddFunctions/AddReports";

const UpdateReservationModal = ({
  reservationId,
  onUpdateSuccess,
  roomId,
  reservationStatus,
}) => {
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

  const reservationData = data.filter((item) => item?.id === reservationId);

  const guestId = reservationData[0]?.guestId;
  const totalDays = reservationData[0]?.totalDays;
  const roomType = reservationData[0]?.roomType;
  const totalAmount = reservationData[0]?.totalAmount;
  const getCurrentFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const currentDate = getCurrentFormattedDate();
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
        const type = "canceled";
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
        AddReports(totalDays, roomType, totalAmount, currentDate);
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
      onUpdateSuccess();
    } catch (error) {
      toast.error(`Error updating reservation: ${error.message}`);
    }
  };
  console.log(status, guestId);
  console.log(reservationData);

  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1 text-blue-500">
            Update Status {reservationStatus}
          </ModalHeader>
          <ModalBody>
            {reservationStatus === "pending" && (
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
              </Select>
            )}
            {reservationStatus === "confirmed" && (
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
                  key="check-in"
                  value="check-in"
                  className="text-green-400"
                >
                  Check-in
                </SelectItem>
              </Select>
            )}
            {reservationStatus === "check-in" && (
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
                  key="check-out"
                  value="check-out"
                  className="text-green-400"
                >
                  Check-out
                </SelectItem>
              </Select>
            )}
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
