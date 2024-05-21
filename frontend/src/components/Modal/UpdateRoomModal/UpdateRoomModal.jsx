import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
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
    console.log(selectedRoomData?.roomNumber);
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
      console.log(roomId, roomNumber, floor, status, roomType),
        await UpdateRoom(roomId, roomNumber, floor, status, roomType),
        await onUpdateSuccess();
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error(`Error updating room: ${error.message}`);
    }
  };

  const isAnyFieldEmpty =
    roomNumber === "" || floor === "" || roomType === "" || status === "";
  console.log(roomTypeData);
  console.log(roomType);
  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className="text-blue-500">Update Room</ModalHeader>
          <ModalBody>
            <div className="flex gap-2">
              <div className="w-full flex flex-col">
                <label htmlFor="roomNumber">
                  Room number <span className="text-red-500">*</span>
                </label>
                <input
                  id="roomNumber"
                  name="roomNumber"
                  type="text"
                  className="w-full px-2 py-2 rounded-md border-2 border-blue-500 outline-none"
                  value={roomNumber}
                  onChange={handleRoomNumberChange}
                />
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="floor">
                  Floor number <span className="text-red-500">*</span>
                </label>
                <select
                  id="floor"
                  name="floor"
                  className="w-full border-2 border-blue-500 px-2 py-2 rounded-md outline-none"
                  value={floor}
                  onChange={handleRoomFloorChange}
                >
                  <option value="">choose floor</option>
                  <option value="first">First floor</option>
                  <option value="second">Second floor</option>
                  <option value="third">Third floor</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-full flex flex-col">
                <label htmlFor="roomType">
                  Room type <span className="text-red-500">*</span>
                </label>
                <Select
                  autoFocus
                  isRequired
                  items={roomTypeData}
                  name="guestData"
                  label="  "
                  size="sm"
                  variant="bordered"
                  className="w-full"
                  color="primary"
                  onChange={handleRoomTypeChange}
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
                <label htmlFor="status">
                  Room status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  className="w-full border-2 border-blue-500 px-2 py-2 rounded-md outline-none"
                  value={status}
                  onChange={handleRoomStatusChange}
                >
                  <option value="">status</option>
                  <option value="available">available</option>
                  <option value="unavailable">unavailable</option>
                  <option value="under maintenance">under maintenance</option>
                </select>
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
