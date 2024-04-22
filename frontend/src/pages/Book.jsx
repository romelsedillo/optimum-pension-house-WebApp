import CalendarComp from "../components/CalendarComp/CalendarComp";
import SingleBed from "../assets/images/single-bed 2.jpg";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Swal from "sweetalert2";

import Modal from "react-modal";

const Book = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBookNow = () => {
    // booking logic here
    handleOpenModal();
  };
  const successHandle = () => {
    Swal.fire("Booking Confirmed!", "Success!", "success");
    console.log("Save button clicked");
    handleCloseModal();
  };

  return (
    <div className="w-full px-36 py-10">
      <div>
        {/* Single Room */}
        <div className=" bg-[#EFEDED] flex items-center gap-8 px-16 py-20">
          <div className="w-[30%]">
            <img src={SingleBed} alt="" width={250} />
          </div>
          <div className="flex flex-col justify-between h-[150px] w-[30%]">
            <h1 className=" font-CormorantGaramond text-[35px]">Single Room</h1>
            <p className=" font-Poppins">Room Rate: 980/Night</p>
            <p className=" font-Poppins">Good for 1 person</p>
            <p className=" font-Poppins">Room Available: 2/2</p>
          </div>
          <div className="flex flex-col gap-16 w-[40%]">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2 justify-center">
                <p>Check-in and Check-out Date</p>
                <div className=" z-10 w-1 h-1">
                  <CalendarComp />
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center">
                {/* <p>Check-out</p> */}
                <div className="flex"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <label htmlFor="">Name:</label>
                <input type="text" />
              </div>
              <div className="flex justify-between">
                <label htmlFor="">Email:</label>
                <input type="text" />
              </div>
              <div className="flex justify-between">
                <label htmlFor="">Contact No:</label>
                <input type="text" />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="flex gap-2 justify-center">
                <p>Number of Guest:</p>
                <input
                  type="number"
                  className="w-10 h-6"
                  name="guest"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                />
              </div>
              <div>
                <button
                  className=" bg-orange-400 text-white px-2 py-1 rounded-[5px]"
                  onClick={handleBookNow}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Double Room */}
        <div className=" bg-[#d3d3d3] flex items-center gap-8 px-16 py-20">
          <div className="w-[30%]">
            <img src={SingleBed} alt="" width={250} />
          </div>
          <div className="flex flex-col justify-between h-[150px] w-[30%]">
            <h1 className=" font-CormorantGaramond text-[35px]">Double Room</h1>
            <p className=" font-Poppins">Room Rate: 1120/Night</p>
            <p className=" font-Poppins">Good for 2 to 3 persons</p>
            <p className=" font-Poppins">Room Available: 5/12</p>
          </div>
          <div className="flex flex-col gap-16 w-[40%]">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2 justify-center">
                <p>Check-in</p>
                <div>
                  <CalendarComp />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <label htmlFor="">Name:</label>
                <input type="text" />
              </div>
              <div className="flex justify-between">
                <label htmlFor="">Email:</label>
                <input type="text" />
              </div>
              <div className="flex justify-between">
                <label htmlFor="">Contact No:</label>
                <input type="text" />
              </div>
              <div className="flex justify-between">
                <label htmlFor="">Guest Address:</label>
                <input type="text" />
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex gap-2 justify-center">
                <p>Number of Guest: </p>
                <input
                  type="number"
                    className="w-10 h-6"
                    name="guest"
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    className=" bg-orange-400 text-white px-2 py-1 rounded-[5px]"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Twin Standard Room */}
          <div className=" bg-[#EFEDED] flex items-center gap-8 px-16 py-20">
            <div className="w-[30%]">
              <img src={SingleBed} alt="" width={250} />
            </div>
            <div className="flex flex-col justify-between h-[150px] w-[30%]">
              <h1 className=" font-CormorantGaramond text-[35px]">
                Twin Standard Room
              </h1>
              <p className=" font-Poppins">Room Rate: 1150/Night</p>
              <p className=" font-Poppins">Good for 3 to 4 persons</p>
              <p className=" font-Poppins">Room Available: 2/17</p>
            </div>
            <div className="flex flex-col gap-8 w-[40%]">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 justify-center">
                  <p>Check-in</p>
                  <div>
                    <CalendarComp />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <label htmlFor="">Name:</label>
                  <input type="text" />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="">Email:</label>
                  <input type="text" />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="">Contact No:</label>
                  <input type="text" />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="">Guest Address:</label>
                  <input type="text" />
                </div>
              </div>

              <div className="flex gap-8">
                <div className="flex gap-2 justify-center">
                  <p>Number of Guest:</p>
                  <input
                    type="number"
                    className="w-10 h-6"
                    name="guest"
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    className=" bg-orange-400 text-white px-2 py-1 rounded-[5px]"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        className=" bg-slate-200 mx-auto h-[400px] w-[500px] mt-28 border flex flex-col items-center justify-center rounded-lg"
      >
        <h2 className="text-2xl mb-4">Booking Summary</h2>
        <p>
          Room Type: Single Room
          <br />
          Check-in: {checkIn ? checkIn.toLocaleDateString() : ""}
          <br />
          Check-out: {checkOut ? checkOut.toLocaleDateString() : ""}
          <br />
          Number of Guests: {numberOfGuests}
          <br />
          Total Cost : ₱ 890.00
        </p>
        {/* Add more summary details as needed */}
        <div className="flex gap-10">
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCloseModal}
          >
            Close
          </button>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => successHandle()}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Book;
