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

const DoubleRoomPage = () => {
  const [roomData, setRoomData] = useState(null);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(addDays(new Date(), 1));
  const chosenDaysCount = differenceInDays(checkOut, checkIn);
  const total = chosenDaysCount * 1120; // Calculating the difference in days
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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
  .then(roomData => {
    console.log(roomData);
  })
  .catch(error => {
    console.error("Error fetching room data:", error);
  });


  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected and its type is either PNG or JPEG
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      toast.error("Please select a valid PNG or JPEG image file.");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBookNow = () => {
    if (!selectedImage) {
      // Display a warning message using toast notification
      toast.error("Please attach proof of payment before booking.");
      return; // Stop further execution
    }

    // Continue with the booking process
    handleOpenModal();
  };

  const successHandle = () => {
    navigate("/");

    Swal.fire({
      title: "Reservation Successful!",
      text: "Thank you for choosing our hotel. Your room has been successfully reserved.",
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
  };
  return (
    <>
      <NavBar />
      <div className="container mx-auto p-10">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="bg-gray-50 rounded-lg p-8 h-[26rem] flex items-start gap-8">
          <div className="w-1/3">
            <img src={IMG_3115} alt="Room" className="rounded-lg w-[40rem]" />
          </div>
          <div className="flex flex-col gap-2 justify-between w-1/3">
            <div className="flex items-baseline gap-3">
              <h1 className="font-semibold text-4xl">Double Room</h1>
              <h2 className="font-semibold text-2xl">Room:{roomData?.roomNumber}</h2>
            </div>
            <div className="flex flex-col gap-1">
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
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-500"
                />
                <p className="text-tiny">Hot and cold shower</p>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-500"
                />
                <p className="text-tiny">
                  Free WIFI with 50mbps internet speed
                </p>
              </div>
            </div>
            <div>
              <p className="font-medium">Room Rate: ₱1120/Night</p>
              <p className="font-medium">Good for 2 to 3 persons</p>
            </div>
            <div className="flex flex-col">
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
          <div className="flex flex-col w-1/3 justify-end gap-4 h-full pb-18">
            <div className="flex flex-reverse items-end justify-between">
              <div className=" flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Upload Image
                </label>
              </div>
              {selectedImage && (
                <div>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className=" w-40 rounded-lg shadow-2xl"
                  />
                </div>
              )}
            </div>
            <button
              className="bg-orange-500 text-white px-1 py-3 rounded-lg hover:bg-orange-600"
              onClick={handleBookNow}
            >
              Book Now
            </button>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          className="bg-white rounded-lg p-8 max-w-lg mx-auto mt-28 shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
          <p className="font-medium mb-4">
            Room Type: Double Room <br />
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
            Total Cost: ₱{total}
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

export default DoubleRoomPage;
