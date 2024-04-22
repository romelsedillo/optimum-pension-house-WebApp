import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Select, SelectItem } from "@nextui-org/react";
import RoomTypeFetch from "../../../utils/Collections/RoomTypefetch";
import UpdateRoom from "../../../utils/UpdateFunctions/UpdateRoom";
// import OneRoomCollection from "../../../utils/Collections/OneRoomCollection";
import RoomAvailableCollection from "../../../utils/Collections/RoomAvailableCollection";

const UpdateRoomModal = ({ roomId, selectedRoomData, onUpdateSuccess }) => {
  const [roomTypeData, setRoomTypeData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [roomType, setRoomType] = useState("");
  const [status, setStatus] = useState("");

  const roomTypeFetchData = async () => {
    try {
      const appWriteData = await RoomTypeFetch();
      setRoomTypeData(appWriteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const roomFetchData = async () => {
    try {
      const appWriteData = await RoomAvailableCollection();
      setRoomData(appWriteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setRoomNumber(selectedRoomData?.roomNumber);
    setFloor(selectedRoomData?.floor);
    setRoomType(selectedRoomData?.roomType);
    setStatus(selectedRoomData?.status);
    console.log(selectedRoomData);
    roomTypeFetchData();
  }, [selectedRoomData]);

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
    console.log(roomId, roomNumber, floor, status, roomType);
    e.preventDefault();
    try {
      await toast.promise(
        UpdateRoom(roomId, roomNumber, floor, status, roomType),
        {
          loading: "Updating...",
          success: <b>Room updated!</b>,
          error: <b>Could not update.</b>,
        }
      );
      onUpdateSuccess();
    } catch (error) {
      console.error("Error updating room.:", error);
      toast.error(`Error updating room.: ${error.message}`);
    }
  };

  const isAnyFieldEmpty =
    roomNumber === "" || floor === "" || roomType === "" || status === "";

  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className=" text-blue-500">Edit Room</ModalHeader>
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
                className="w-full text-black"
                color="primary"
                defaultSelectedKeys={[floor]}
                value={"okay"}
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
                name="roomType"
                size="sm"
                variant="bordered"
                className="w-full"
                color="primary"
                defaultSelectedKeys={["cat"]}
                onChange={handleRoomTypeChange}
              >
                {roomTypeData.map((type) => (
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
              Edit Room
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default UpdateRoomModal;
