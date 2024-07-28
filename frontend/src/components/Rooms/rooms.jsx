import { useState, useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { roomTypeCollection } from "../../utils/Collections/RoomTypeCollection";

import SingleBedroom from "../../assets/images/single-bed 2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@nextui-org/react";

const Rooms = () => {
  const [roomRate, setRoomRate] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const fetch = async () => {
    try {
      const appWriteData = await roomTypeCollection();
      setRoomRate(appWriteData);
    } catch (error) {
      console.error("Error fetching notification notifications:", error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const singleRoom = roomRate.find((room) => room?.typeName === "single room");
  const doubleRoom = roomRate.find((room) => room?.typeName === "double room");
  const twinStandardRoom = roomRate.find(
    (room) => room?.typeName === "twin standard room"
  );
  return (
    <>
      <div className=" bg-[#f5f5f5] w-full flex flex-col items-center py-10 max-w-6xl mx-auto px-4 my-10">
        {/* -----------HEADING------------ */}
        <div className="flex flex-col items-center my-10">
          <h1 className=" font-Montserrat font-bold text-[30px]">
            Check-in Time: 12 Noon
          </h1>
          <h1 className=" font-Montserrat font-bold text-[30px]">
            Check-out Time: 12 Noon
          </h1>
          <p className="text-[#DD7210] text-[12px]">
            (Rates are subject to change without prior notice)
          </p>
        </div>

        {/*--------- ROOMS ---------- */}
        <div className="flex flex-col gap-8">
          {/* ------------ SINGLE ROOM ---------- */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 sm:px-12">
            <div className="">
              <img
                src={SingleBedroom}
                alt="single room"
                className=" rounded-md"
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center md:px-10 gap-3">
              <div className="flex flex-col gap-2">
                <h1 className=" font-CormorantGaramond text-[43px] italic font-bold text-center sm:text-left">
                  Single Room
                </h1>
                <p className="text-sm text-justify font-bold">
                  Welcome to our cozy Single Room, a perfect choice for solo
                  travelers seeking comfort and tranquility. This thoughtfully
                  designed room offers a harmonious blend of modern amenities
                  and classic charm.
                </p>
                <p className=" font-Montserrat">
                  Room Rate:{" "}
                  <span className="text-[#9B8046]">
                    &#8369; {singleRoom?.rate}.00
                  </span>{" "}
                  / NIGHT{" "}
                </p>
                <p className=" font-Montserrat">Good for: 1 person</p>
              </div>
              <div className="flex flex-col w-full  gap-3">
                <div className="flex w-full gap-2">
                  <div className=" w-6 h-6 bg-[#4CAF50] flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className=" text-[#ccff90]"
                    />
                  </div>
                  <p className="text-[12px] font-bold">
                    Fully air conditioned room
                  </p>
                </div>
                <div className="flex w-full gap-2">
                  <div className=" w-6 h-6 bg-[#4CAF50] flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className=" text-[#ccff90]"
                    />
                  </div>
                  <p className="text-[12px] font-bold">LED TV w/ cable</p>
                </div>
                <div className="flex w-full gap-2">
                  <div className=" w-6 h-6 bg-[#4CAF50] flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className=" text-[#ccff90]"
                    />
                  </div>
                  <p className="text-[12px] font-bold">Hot and cold shower</p>
                </div>
                <div className="flex w-full gap-2">
                  <div className=" w-6 h-6 bg-[#4CAF50] flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className=" text-[#ccff90]"
                    />
                  </div>
                  <p className="text-[12px] font-bold">
                    Free WIFI with 50mbps internet speed
                  </p>
                </div>
              </div>
              <div className=" w-full mt-4">
                <Button
                  size="md"
                  radius="sm"
                  className=" bg-[#DD7210] text-white"
                  onClick={() =>
                    user ? navigate("/single-rooms") : navigate("/login")
                  }
                >
                  BOOK NOW
                </Button>
              </div>
            </div>
          </div>

          {/* -------------- DOUBLE ROOM -------------------------------- */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 sm:px-12">
            <div className="order-first md:order-last">
              <img src={SingleBedroom} alt="" className="rounded-md" />
            </div>
            <div className="sm:order-first flex flex-col items-center justify-center md:px-10 gap-2">
              <div className="flex flex-col gap-2">
                <h1 className=" font-CormorantGaramond text-[43px] italic font-bold text-center sm:text-left">
                  Double Room
                </h1>
                <p className="text-sm text-justify font-bold">
                  Step into comfort and elegance with our spacious Double Room,
                  designed to accommodate couples or travelers who appreciate a
                  bit of extra space. This inviting room combines modern
                  sophistication with a cozy ambiance for a truly relaxing stay.
                </p>
                <p className=" font-Montserrat">
                  Room Rate:{" "}
                  <span className="text-[#9B8046]">
                    &#8369; {doubleRoom?.rate}.00
                  </span>{" "}
                  / NIGHT{" "}
                </p>
                <p className="text-[12px] font-bold font-Montserrat">
                  1 Matrimonial Bed | plus 1 extra bed{" "}
                </p>
                <p className=" font-Montserrat">Good for: 2 to 3 persons</p>
              </div>
              <div className="flex flex-col w-full  gap-3">
                <div className="flex w-full gap-2">
                  <div className=" w-6 h-6 bg-[#4CAF50] flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className=" text-[#ccff90]"
                    />
                  </div>
                  <p className="text-[12px] font-bold">
                    Fully air conditioned room
                  </p>
                </div>
                <div className="flex w-full gap-2">
                  <div className=" w-6 h-6 bg-[#4CAF50] flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className=" text-[#ccff90]"
                    />
                  </div>
                  <p className="text-[12px] font-bold">LED TV w/ cable</p>
                </div>
                <div className="flex w-full gap-2">
                  <div className=" w-6 h-6 bg-[#4CAF50] flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className=" text-[#ccff90]"
                    />
                  </div>
                  <p className="text-[12px] font-bold">Hot and cold shower</p>
                </div>
                <div className="flex w-full gap-2">
                  <div className=" w-6 h-6 bg-[#4CAF50] flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className=" text-[#ccff90]"
                    />
                  </div>
                  <p className="text-[12px] font-bold">
                    Free WIFI with 50mbps internet speed
                  </p>
                </div>
              </div>
              <div className=" w-full mt-4">
                <Button
                  size="md"
                  radius="sm"
                  className=" bg-[#DD7210] text-white"
                  onClick={() =>
                    user ? navigate("/double-rooms") : navigate("/login")
                  }
                >
                  BOOK NOW
                </Button>
              </div>
            </div>
          </div>

          {/* --------------- TWIN DOUBLE ------------------------------ */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 sm:px-12">
            <div className="">
              <img src={SingleBedroom} alt="" className="rounded-md" />
            </div>
            <div className="flex flex-col items-center justify-center md:px-10 gap-2">
              <div className="flex flex-col ga2-1 w-full">
                <h1 className=" font-CormorantGaramond text-[43px] italic font-bold text-center sm:text-left">
                  Twin Standard Room
                </h1>
                <p className=" text-sm text-justify font-bold">
                  Discover the perfect harmony of comfort and functionality in
                  our Twin Standard Room. Ideal for friends, family members, or
                  colleagues traveling together, this room provides a cozy
                  retreat with thoughtful amenities.
                </p>
                <p className=" font-Montserrat">
                  Room Rate:{" "}
                  <span className="text-[#9B8046]">
                    &#8369; {twinStandardRoom?.rate}.00
                  </span>{" "}
                  / NIGHT{" "}
                </p>
                <p className="text-[12px] font-bold font-Montserrat">
                  2 Single Beds / 1 Matrimonial Bed
                </p>
                <p className=" font-Montserrat">Good for: 3 to 4 persons</p>
              </div>
              <div className="flex flex-col w-full  gap-3">
                <div className="flex w-full gap-2">
                  <div className=" w-6 h-6 bg-[#4CAF50] flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className=" text-[#ccff90]"
                    />
                  </div>
                  <p className="text-[12px] font-bold">
                    Fully air conditioned room
                  </p>
                </div>
                <div className="flex w-full gap-2">
                  <div className=" w-6 h-6 bg-[#4CAF50] flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className=" text-[#ccff90]"
                    />
                  </div>
                  <p className="text-[12px] font-bold">LED TV w/ cable</p>
                </div>
                <div className="flex w-full gap-2">
                  <div className=" w-6 h-6 bg-[#4CAF50] flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className=" text-[#ccff90]"
                    />
                  </div>
                  <p className="text-[12px] font-bold">Hot and cold shower</p>
                </div>
                <div className="flex w-full gap-2">
                  <div className=" w-6 h-6 bg-[#4CAF50] flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className=" text-[#ccff90]"
                    />
                  </div>
                  <p className="text-[12px] font-bold">
                    Free WIFI with 50mbps internet speed
                  </p>
                </div>
              </div>
              <div className=" w-full mt-3">
                <Button
                  size="md"
                  radius="sm"
                  className=" bg-[#DD7210] text-white"
                  onClick={() =>
                    user ? navigate("/twin-standard-rooms") : navigate("/login")
                  }
                >
                  BOOK NOW
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
