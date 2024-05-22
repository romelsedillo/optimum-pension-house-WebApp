import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UpdateRoom from "../../../utils/UpdateFunctions/UpdateRoom";
import { roomTypeCollection } from "../../../utils/Collections/RoomTypeCollection";

const UpdateRoomModal = ({ roomId, selectedRoomData, onUpdateSuccess }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [roomTypeData, setRoomTypeData] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [status, setStatus] = useState("");

  const roomTypeFetchData = async () => {
    try {
      const appWriteData = await roomTypeCollection();
      setRoomTypeData(appWriteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    setRoomNumber(selectedRoomData?.roomNumber);
    roomTypeFetchData();
  }, [selectedRoomData]);

  const handleRoomNumberChange = (event) => {
    setRoomNumber(event.target.value);
  };
  const handleRoomFloorChange = (event) => {
    setFloor(event.target.value);
  };
  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value); // Ensure this is an array
  };
  const handleRoomStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await UpdateRoom(roomId, roomNumber, floor, status, roomType),
        await onUpdateSuccess();
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error(`Error updating room: ${error.message}`);
    }
  };

  const isAnyFieldEmpty =
    roomNumber === "" || floor === "" || roomType === "" || status === "";
  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className="text-blue-500">Update Room</ModalHeader>
          <ModalBody>
            <div className="flex gap-2">
              <div className="w-full flex flex-col">
                <Input
                  isRequired
                  id="roomNumber"
                  name="roomNumber"
                  label="Room number"
                  size="sm"
                  type="text"
                  className="w-full rounded-md border-2 border-blue-500 outline-none"
                  value={roomNumber}
                  onChange={handleRoomNumberChange}
                />
              </div>
              <div className="w-full flex flex-col">
                <Select
                  isRequired
                  id="floor"
                  name="floor"
                  label="Floor"
                  size="sm"
                  className="w-full border-2 border-blue-500 rounded-md outline-none"
                  value={floor}
                  onChange={handleRoomFloorChange}
                >
                  <SelectItem value="first">First floor</SelectItem>
                  <SelectItem value="second">Second floor</SelectItem>
                  <SelectItem value="third">Third floor</SelectItem>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-full flex flex-col">
                <Select
                  isRequired
                  items={roomTypeData}
                  name="roomType"
                  label="Room type"
                  size="sm"
                  onChange={handleRoomTypeChange}
                  className="w-full border-2 border-blue-500 rounded-md outline-none"
                  value={roomType}
                >
                  {(roomTypeData) => (
                    <SelectItem key={roomTypeData.id} value={roomTypeData.id}>
                      {roomTypeData.typeName}
                    </SelectItem>
                  )}
                </Select>
              </div>
              <div className="w-full flex flex-col">
                <Select
                  isRequired
                  id="status"
                  name="status"
                  label="Room status"
                  size="sm"
                  className="w-full border-2 border-blue-500 rounded-md outline-none"
                  value={status}
                  onChange={handleRoomStatusChange}
                >
                  <SelectItem value="available">available</SelectItem>
                  <SelectItem value="unavailable">unavailable</SelectItem>
                  <SelectItem value="under maintenance">
                    under maintenance
                  </SelectItem>
                </Select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" size="sm" onPress={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              color="primary"
              size="sm"
              onPress={onClose}
              isDisabled={isAnyFieldEmpty}
            >
              Update Room
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default UpdateRoomModal;
