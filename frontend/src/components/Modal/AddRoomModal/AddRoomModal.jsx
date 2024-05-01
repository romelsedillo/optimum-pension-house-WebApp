import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import toast from "react-hot-toast";
import roomTypeFetch from "./roomTypefetch";
import { addRoom } from "../../../utils/AddFunctions/AddRoom";

const AddGuestModal = ({ onAddSuccess }) => {
  const [data, setData] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [roomType, setRoomType] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appWriteData = await roomTypeFetch();
        setData(appWriteData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const handleRoomNumberChange = (event) => {
    setRoomNumber(event.target.value);
  };
  const handleRoomFloorChange = (event) => {
    setFloor(event.target.value);
  };
  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };
  const handleRoomStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(addRoom(roomNumber, floor, status, roomType), {
        loading: "Saving...",
        success: <b>New room added!</b>,
        error: <b>Could not save.</b>,
      });
      onAddSuccess();
    } catch (error) {
      console.error("Error adding room:", error);
      toast.error(`Error adding room: ${error.message}`);
    }
  };

  const isAnyFieldEmpty =
    roomNumber === "" || floor === "" || roomType === "" || status === "";

  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className="text-blue-500">Add New Room</ModalHeader>
          <ModalBody>
            <div className="flex gap-2">
              <Input
                isRequired
                autoFocus
                name="roomNumber"
                size="sm"
                type="text"
                label="Room number"
                variant="bordered"
                className="w-full"
                color="primary"
                value={roomNumber}
                onChange={handleRoomNumberChange}
              />
              <Select
                isRequired
                label="Room floor"
                name="floor"
                size="sm"
                variant="bordered"
                className="w-full"
                color="primary"
                value={floor}
                onChange={handleRoomFloorChange}
              >
                <SelectItem key="first" value="first">
                  First floor
                </SelectItem>
                <SelectItem key="second" value="second">
                  Second floor
                </SelectItem>
                <SelectItem key="third" value="third">
                  Third floor
                </SelectItem>
              </Select>
            </div>
            <div className="flex gap-2">
              <Select
                isRequired
                label="Room type"
                name="roomNumber"
                size="sm"
                variant="bordered"
                className="w-full"
                color="primary"
                value={roomType}
                onChange={handleRoomTypeChange}
              >
                {data.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.typeName}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Room status"
                name="roomNumber"
                size="sm"
                variant="bordered"
                className="w-full"
                color="primary"
                value={roomType}
                onChange={handleRoomStatusChange}
              >
                <SelectItem key="available" value="available">
                  Available
                </SelectItem>
                <SelectItem key="under maintenance" value="under maintenance">
                  Under Maintenance
                </SelectItem>
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" size="md" onPress={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              color="primary"
              size="md"
              onPress={onClose}
              isDisabled={isAnyFieldEmpty}
            >
              Add Room
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default AddGuestModal;
