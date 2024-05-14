import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UpdateRoom from "../../../utils/UpdateFunctions/UpdateRoom";

const UpdateRoomModal = ({ roomId, selectedRoomData, onUpdateSuccess }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [roomType, setRoomType] = useState("");
  const [status, setStatus] = useState("");

  // const roomTypeFetchData = async () => {
  //   try {
  //     const appWriteData = await RoomTypeFetch();
  //     setRoomTypeData(appWriteData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const roomFetchData = async () => {
  //   try {
  //     const appWriteData = await RoomAvailableCollection();
  //     setRoomData(appWriteData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  useEffect(() => {
    setRoomNumber(selectedRoomData?.roomNumber);
    setFloor(selectedRoomData?.floor);
    setRoomType(selectedRoomData?.roomType);
    setStatus(selectedRoomData?.status);
    // roomTypeFetchData();
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
    e.preventDefault();
    try {
      // await toast.promise(
      //   UpdateRoom(roomId, roomNumber, floor, status, roomType),
      //   {
      //     loading: "Updating...",
      //     success: <b>Room updated!</b>,
      //     error: <b>Could not update.</b>,
      //   }
      // );
      await UpdateRoom(roomId, roomNumber, floor, status, roomType),
        await onUpdateSuccess();
    } catch (error) {
      console.error("Error updating room.:", error);
      toast.error(`Error updating room.: ${error.message}`);
    }
  };

  const isAnyFieldEmpty =
    roomNumber === "" || floor === "" || roomType === "" || status === "";
  console.log(selectedRoomData);
  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className=" text-blue-500">Update Room</ModalHeader>
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
                  <option value="first">First floor</option>
                  <option value="second">Second floor</option>
                  <option value="third">Third floor</option>
                </select>
              </div>
              {/* <Select
                isRequired
                label="Room floor"
                name="floor"
                size="sm"
                variant="bordered"
                className="w-full text-black"
                color="primary"
                defaultSelectedKeys={[""]}
                value={floor}
                onChange={handleRoomFloorChange}
              >
                <SelectItem key="first" value="first">
                  first
                </SelectItem>
                <SelectItem key="second" value="second">
                  Second
                </SelectItem>
                <SelectItem key="third" value="third">
                  third
                </SelectItem>
              </Select> */}
            </div>
            <div className="flex gap-2">
              <div className="w-full flex flex-col">
                <label htmlFor="floor">
                  Room type <span className="text-red-500">*</span>
                </label>
                <select
                  id="roomType"
                  name="roomType"
                  className="w-full border-2 border-blue-500 px-2 py-2 rounded-md outline-none"
                  value={roomType}
                  onChange={handleRoomTypeChange}
                >
                  <option value="single room">single room</option>
                  <option value="double room">double room</option>
                  <option value="twin standard room">twin standard room</option>
                  {/* {roomTypeData.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.typeName}
                    </option>
                  ))} */}
                </select>
              </div>
              {/* <Select
                isRequired
                label="Room type"
                name="roomType"
                size="sm"
                variant="bordered"
                className="w-full"
                color="primary"
                onChange={handleRoomTypeChange}
              >
                {roomTypeData.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.typeName}
                  </SelectItem>
                ))}
              </Select> */}
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
                  <option value="available">available</option>
                  <option value="unavailable">unavailable</option>
                  <option value="under maintenance">under maintenance</option>
                </select>
              </div>
              {/* <Select
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
              </Select> */}
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
