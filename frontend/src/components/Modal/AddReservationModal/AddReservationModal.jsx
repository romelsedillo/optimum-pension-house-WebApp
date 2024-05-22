import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { guestCollection } from "../../../utils/Collections/GuestCollection";
import { roomTypeCollection } from "../../../utils/Collections/RoomTypeCollection";
import { roomCollection } from "../../../utils/Collections/RoomAvailableCollection";
import { differenceInDays, addDays } from "date-fns";
import format from "date-fns/format";
import { addReservation } from "../../../utils/AddFunctions/AddReservation";
import { roomCollectionType } from "../../../utils/Collections/RoomCollectionType";
import RoomReserved from "../../../utils/UpdateFunctions/RoomReserved";
import { getCurrentDateTime } from "../../../utils/CurrentDayTime";
import { toast } from "react-hot-toast";
import CalendarComp from "../../CalendarComp/CalendarComp";
import { formatNumberWithCommas } from "../../../utils/formatNumberWithCommas";

const AddReservationModal = ({ onAddSuccess }) => {
  const [guestData, setGuestData] = useState([]);
  const [roomTypeData, setRoomTypeData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [guests, setGuests] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(addDays(new Date(), 1));
  const chosenDaysCount = differenceInDays(checkOut, checkIn);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [rooms, setRooms] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [roomTypeBase, setRoomTypeBase] = useState([]);

  const [selectedValue, setSelectedValue] = useState(null); // Change default value to null

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
  }, [roomType, roomTypeBase]);

  const subTotal = roomPrice * chosenDaysCount;
  const totalAmount = subTotal * (1 - (selectedValue || 0));
  const discountAmount = subTotal - totalAmount;
  console.log(discountAmount);
  useEffect(() => {
    if (selectedValue) {
      console.log("discounted");
      setIsDiscounted(true);
    } else {
      console.log("not discounted");
      setIsDiscounted(false);
    }
  }, [selectedValue]);

  // useEffect(() => {
  //   if (totalAmount === subTotal) {
  //     console.log("not discounted");
  //     setIsDiscounted(false);
  //   }
  //   if (totalAmount !== subTotal) {
  //     console.log("discounted");
  //     setIsDiscounted(true);
  //   }
  // }, [subTotal]);

  const handleRadioChange = (event) => {
    const value = Number(event.target.value);
    setSelectedValue((prevValue) => (prevValue === value ? null : value)); // Deselect if the same value is clicked
  };

  const handleRoomTypeChange = (event) => {
    const selectedRoomTypeId = event.target.value;
    const selectedRoomType = roomTypeData.find(
      (roomtype) => roomtype.id === selectedRoomTypeId
    );

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
    }

    setRoomType(selectedRoomTypeId);
  };

  const handleGuestDataChange = (event) => {
    setGuests(event.target.value);
  };
  const handleRoomNumberChange = (event) => {
    setRooms(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDateTime = getCurrentDateTime();
    const type = "walk-in";
    const status = "pending";

    toast.promise(
      addReservation(
        currentDateTime,
        type,
        checkIn,
        checkOut,
        referenceNumber,
        status,
        guests,
        rooms,
        chosenDaysCount,
        subTotal,
        totalAmount,
        isDiscounted,
        discountAmount
      ),
      {
        loading: "Saving...",
        success: <b>Reservation saved!</b>,
        error: <b>Could not save.</b>,
      }
    );

    RoomReserved(rooms);
    onAddSuccess();
    console.log(subTotal, totalAmount, isDiscounted);
  };

  const isAnyFieldEmpty =
    guests === "" ||
    checkIn === "" ||
    checkOut === "" ||
    roomType === "" ||
    rooms === "";

  return (
    <ModalContent className=" max-h-[450px] overflow-y-auto">
      {(onClose) => (
        <form onSubmit={handleSubmit} className="">
          <ModalHeader className="text-sm text-blue-500">
            Add Reservation
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
                  Check-in Date: <span className="text-red-500">*</span>
                </label>
                <Input
                  isRequired
                  name="checkIn"
                  size="sm"
                  type="date"
                  variant="bordered"
                  className="w-full"
                  color="primary"
                  value={`${format(checkIn, "yyyy-MM-dd")}`}
                  onChange={(e) => setCheckIn(e.target.value)}
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
                  value={`${format(checkOut, "yyyy-MM-dd")}`}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div className="hidden">
                <CalendarComp
                  setCheckIn={setCheckIn}
                  setCheckOut={setCheckOut}
                  chosenDaysCount={chosenDaysCount}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-full flex flex-col">
                <Input
                  autoComplete="off"
                  name="reference"
                  label="Reference # for gcash only"
                  color="primary"
                  size="sm"
                  type="number"
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
              <RadioGroup
                name="discount"
                orientation="horizontal"
                label="Select for discount"
                onChange={handleRadioChange}
                value={selectedValue}
              >
                {/* <Radio value={0.0} checked={selectedValue === 0.0}>
                  remove discount
                </Radio> */}
                <Radio value={0.05} checked={selectedValue === 0.05}>
                  5%
                </Radio>
                <Radio value={0.1} checked={selectedValue === 0.1}>
                  10%
                </Radio>
                <Radio value={0.15} checked={selectedValue === 0.15}>
                  15%
                </Radio>
                <Radio value={0.2} checked={selectedValue === 0.2}>
                  20%
                </Radio>
              </RadioGroup>
            </div>
            <div>
              <p className="text-1xl text-blue-500">
                Subtotal:{" "}
                <span className="text-1xl">
                  &#8369; {formatNumberWithCommas(subTotal)}.00
                </span>
              </p>
              <p className="text-1xl text-blue-500">
                Total:{" "}
                <span className="text-1xl">
                  &#8369; {formatNumberWithCommas(totalAmount)}.00
                </span>
              </p>
              <p className="text-1xl text-blue-500">
                Discount amount:{" "}
                <span className="text-1xl">
                  &#8369; {formatNumberWithCommas(discountAmount)}.00
                </span>
              </p>
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
              Add Reservation
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default AddReservationModal;
