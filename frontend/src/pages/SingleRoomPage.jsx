import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/footer";
import Modal from "react-modal";
import CalendarComp from "../components/CalendarComp/CalendarComp";
import IMG_3115 from "../components/DoubleRooms/Images/IMG_3115.jpg";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";
import { differenceInDays, addDays } from "date-fns"; // Importing differenceInDays and addDays functions
import { useNavigate } from "react-router-dom";
import { DataRoomFetch } from "../utils/DataRoomFetch";
import { useAuth } from "../utils/AuthContext";
import gcashqrcode from "../assets/images/gcash-qrcode.jpg";
import { Input, Button, Card, CardFooter, Image } from "@nextui-org/react";
import AddReservation from "../utils/AddFunctions/AddReservation";
import RoomUnavailable from "../utils/UpdateFunctions/RoomUnavailable";
import { getCurrentDateTime } from "../utils/CurrentDayTime";

const SingleRoomPage = () => {
  const { user } = useAuth();
  const [roomData, setRoomData] = useState(null);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(addDays(new Date(), 1));
  const chosenDaysCount = differenceInDays(checkOut, checkIn);
  const totalAmount = chosenDaysCount * 980; // Calculating the difference in days
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { roomId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DataRoomFetch(roomId);
        // Access the first element of the array as an object
        const roomObject = data.length > 0 ? data[0] : null;
        setRoomData(roomObject);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchData();
  }, [roomId]);

  DataRoomFetch(roomId)
    .then((roomData) => {
      console.log(roomData);
    })
    .catch((error) => {
      console.error("Error fetching room data:", error);
    });

  const handleReference = (event) => {
    setReferenceNumber(event.target.value);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBookNow = () => {
    handleOpenModal();
  };
  const currentDateTime = getCurrentDateTime();

  const isEmpty = referenceNumber === "";
  const successHandle = () => {
    const currentDateTime = getCurrentDateTime();
    const type = "online";
    const status = "pending";
    currentDateTime,
    type
    AddReservation(
      checkIn,
      checkOut,
      status,
      totalAmount,
      user.$id,
      roomId,
      referenceNumber,
      currentDateTime,
      type
    );
    RoomUnavailable(roomId);
    navigate("/");
    Swal.fire({
      title: "Reservation in process!",
      text: "Please wait for your booking confirmation.",
      icon: "success",
      timer: 5000,
      customClass: {
        title: "text-green-600 font-bold",
        content: "text-gray-700",
        popup: "bg-white",
        closeButton: "text-green-600",
      },
    });
    setIsModalOpen(false);
  console.log(currentDateTime);
  console.log(checkIn);
  console.log(checkOut);

  };
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-[140px] py-10">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="bg-gray-100 rounded-lg p-8 h-[42rem] flex flex-col gap-10">
          <div className="flex gap-6 w-full">
            <Card
              isFooterBlurred
              className=" h-[250px] overflow-hidden col-span-12 sm:col-span-5"
            >
              <Image
                src={IMG_3115}
                removeWrapper
                alt="Room"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              />
              <CardFooter className="overflow-hidden absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 justify-between">
                <p className="text-white text-md capitalize my-2">
                  Room: <span className="">{roomData?.roomNumber}</span>
                </p>
              </CardFooter>
            </Card>
            <div className="w-2/3 flex flex-col gap-4">
              <div className="flex items-baseline gap-8">
                <h1 className="font-semibold text-5xl text-orange-500">
                  Single Room
                </h1>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex w-full gap-16">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-green-500"
                      />
                      <p className="text-tiny">Fully air conditioned room</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-green-500"
                      />
                      <p className="text-tiny">LED TV w/ cable</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-green-500"
                      />
                      <p className="text-tiny">Hot and cold shower</p>
                    </div>
                    <div className="flex gap-2">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-green-500"
                      />
                      <p className="text-tiny">
                        Free WIFI with 50mbps internet speed
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-8">
                  <p className="font-medium text-lg">
                    Room Rate: <span className="text-orange-500">₱980</span>{" "}
                    /night
                  </p>
                  <p className="font-medium text-lg">Good for 1 person</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-start justify-between mt-8">
            <div className="flex flex-col gap-2">
              <div>
                <img src={gcashqrcode} alt="" className=" rounded-3xl w-40" />
              </div>
              <div>
                <p>We accept Gcash payments.</p>
                <p>Gcash #: 0912345677889</p>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="reference" className="text-blue-500">
                  Reference # <span className="text-red-500">*</span>
                </label>
                <Input
                  autoFocus
                  autoComplete="off"
                  radius="sm"
                  size="sm"
                  value={referenceNumber}
                  name="reference"
                  type="text"
                  color="primary"
                  className="w-full"
                  onChange={handleReference}
                  onClear={() => setReferenceNumber("")}
                />
              </div>
              <Button
                isDisabled={isEmpty}
                radius="sm"
                size="md"
                color="primary"
                className="w-full"
                onClick={handleBookNow}
              >
                Book Now
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-32">
                <p className="font-semibold">Check-in:</p>
                <p className="font-semibold">Check-out:</p>
              </div>
              <div className="overflow-hidden">
                <CalendarComp
                  setCheckIn={setCheckIn}
                  setCheckOut={setCheckOut}
                  chosenDaysCount={chosenDaysCount}
                />
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          className="bg-white rounded-lg p-8 max-w-lg mx-auto mt-28 shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
          <p className="font-medium mb-4">
            Room Type: Single Room <br />
            Check-in:{" "}
            {checkIn
              ? checkIn.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : ""}{" "}
            <br />
            Check-out:{" "}
            {checkOut
              ? checkOut.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : ""}{" "}
            <br />
            Number of Days: {chosenDaysCount}
            <br />
            Total Cost: ₱{totalAmount}
          </p>
          <div className="flex justify-around">
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-lg mr-4 hover:bg-red-600"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              onClick={successHandle}
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default SingleRoomPage;
