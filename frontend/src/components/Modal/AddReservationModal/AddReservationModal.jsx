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
// import { fetchDataFromDatabase } from "../../Tables/GuestsTable/datafetch";
import { guestCollection } from "../../../utils/Collections/GuestCollection";
import { roomTypeCollection } from "../../../utils/Collections/RoomTypeCollection";
import { roomCollection } from "../../../utils/Collections/RoomAvailableCollection";
import { differenceInDays, addDays } from "date-fns";
import format from "date-fns/format";
import { addReservation } from "../../../utils/AddFunctions/AddReservation";
import { roomCollectionType } from "../../../utils/Collections/RoomCollectionType";
import RoomUnavailable from "../../../utils/UpdateFunctions/RoomUnavailable";

const AddReservationModal = () => {
  const [guestData, setGuestData] = useState([]);
  const [roomTypeData, setRoomTypeData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [guests, setGuests] = useState("");
  const [referenceNumber, setReferenceNumber] = useState();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 1));
  const chosenDaysCount = differenceInDays(checkOutDate, checkInDate);
  const [roomType, setRoomType] = useState("");
  const [rooms, setRooms] = useState("");

  const [roomTypeRateData, setRoomTypeRateData] = useState("");
  const [roomRate, setRoomRate] = useState(0);
  const [roomPrice, setRoomPrice] = useState(0);
  const [roomTypeBase, setRoomTypeBase] = useState([]);

  useEffect(() => {
    const guestFetchData = async () => {
      try {
        const appWriteData = await guestCollection();
        setGuestData(appWriteData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const roomTypeFetchData = async () => {
      try {
        const appWriteData = await roomTypeCollection();
        setRoomTypeData(appWriteData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const roomFetchData = async () => {
      try {
        const appWriteData = await roomCollection();
        setRoomData(appWriteData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const roomCollectionTypeData = async () => {
      try {
        const appWriteData = await roomCollectionType(roomType);
        setRoomTypeBase(appWriteData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    guestFetchData();
    roomTypeFetchData();
    roomFetchData();
    roomCollectionTypeData();

    console.log(roomTypeBase);
  }, [roomType, roomTypeBase]);

  const totalAmount = roomPrice * chosenDaysCount;

  const handleRoomTypeChange = (event) => {
    const selectedRoomTypeId = event.target.value;
    console.log("Selected room type ID:", selectedRoomTypeId);

    // Find the room type object based on the selected ID
    const selectedRoomType = roomTypeData.find(
      (roomtype) => roomtype.id === selectedRoomTypeId
    );

    // Check if the room type object is found
    if (selectedRoomType) {
      const typeName = selectedRoomType.typeName;

      if (typeName === "single room") {
        setRoomPrice(890);
      }
      if (typeName === "double room") {
        setRoomPrice(1120);
      }
      if (typeName === "twin standard room") {
        setRoomPrice(1250);
      }

      console.log("Selected room type name:", typeName);

      // You can use 'typeName' as needed
    } else {
      console.error("Room type not found for ID:", selectedRoomTypeId);
    }

    setRoomType(selectedRoomTypeId);
  };

  const handleGuestDataChange = (event) => {
    setGuests(event.target.value);
  };
  const handleRoomNumberChange = (event) => {
    setRooms(event.target.value);
  };
  const handleRoomRateChange = (event) => {
    setRoomRate(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const status = "pending";
    addReservation(
      checkInDate,
      checkOutDate,
      status,
      totalAmount,
      guests,
      rooms,
      referenceNumber
    );
    RoomUnavailable(rooms);

    console.log(
      checkInDate,
      checkOutDate,
      status,
      totalAmount,
      guests,
      rooms,
      referenceNumber
    );
  };
  const isAnyFieldEmpty =
    guests === "" ||
    referenceNumber === "" ||
    checkInDate === "" ||
    checkOutDate === "" ||
    roomType === "" ||
    rooms === "";
  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1 text-blue-500">
            Add New Reservation
          </ModalHeader>
          <ModalBody>
            <div className="w-full flex gap-2">
              <Select
                autoFocus
                isRequired
                items={guestData}
                name="guestData"
                label="Guest Name"
                size="sm"
                variant="bordered"
                className="w-full"
                color="primary"
                onChange={handleGuestDataChange}
                value={guests}
              >
                {(guestdata) => (
                  <SelectItem key={guestdata.id} value={guestdata.id}>
                    {guestdata.name}
                  </SelectItem>
                )}
              </Select>
              <Select
                isRequired
                items={roomTypeData}
                name="roomType"
                label="Room Type"
                size="sm"
                variant="bordered"
                className="w-full"
                color="primary"
                value={roomType}
                onChange={handleRoomTypeChange}
              >
                {(roomtypedata) => (
                  <SelectItem key={roomtypedata.id} value={roomtypedata.id}>
                    {roomtypedata.typeName}
                  </SelectItem>
                )}
              </Select>
            </div>
            <div className="flex gap-2">
              <div className="w-full flex flex-col">
                <label htmlFor="checkIn" className="text-blue-500">
                  CHeck-in Date: <span className="text-red-500">*</span>
                </label>
                <Input
                  isRequired
                  name="checkIn"
                  size="sm"
                  type="date"
                  variant="bordered"
                  className="w-full"
                  color="primary"
                  value={`${format(checkInDate, "yyyy-MM-dd")}`}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="checkOut" className="text-blue-500">
                  Check-out Date: <span className="text-red-500">*</span>
                </label>
                <Input
                  size="sm"
                  type="date"
                  variant="bordered"
                  className="w-full"
                  color="primary"
                  value={`${format(checkOutDate, "yyyy-MM-dd")}`}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-full flex flex-col">
                <Input
                  isRequired
                  name="reference"
                  label="Reference #"
                  color="primary"
                  size="sm"
                  type="text"
                  variant="bordered"
                  className="w-full"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col">
                <Select
                  isRequired
                  items={roomTypeBase}
                  name="roomNumber"
                  label="Room Number"
                  size="sm"
                  variant="bordered"
                  className="w-full"
                  color="primary"
                  selectedKeys={[rooms]}
                  value={rooms}
                  onChange={handleRoomNumberChange}
                >
                  {(roomTypeBasedata) => (
                    <SelectItem
                      key={roomTypeBasedata.id}
                      value={roomTypeBasedata.id}
                    >
                      {`Room ${roomTypeBasedata.roomNumber}`}
                    </SelectItem>
                  )}
                </Select>
              </div>
            </div>
            <div>
              <p className="text-1xl text-blue-500">
                Total Amount &#8369; {totalAmount}{" "}
              </p>
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
              Add Reservation
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default AddReservationModal;
