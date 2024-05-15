import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "react-modal";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { fetchDataFromAppwrite } from "./datafetch";
import CardSkeleton from "../Skeleton/CardSkeleton";
import IMG_3128 from "./Images/IMG_3128.jpg";

const TwinStandardComp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleClick = (roomId) => {
    // Navigate to the desired page
    navigate(`/twin-standard/${roomId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appWriteData = await fetchDataFromAppwrite();
        setData(appWriteData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  console.log(data);
  const [selectedImage, setSelectedImage] = useState(null);

  const customStyles = {
    content: {
      top: "57%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto p-1">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {data.map((room, index) => (
            <div key={index}>
              <Card
                isFooterBlurred
                key={index}
                className=" h-[300px] overflow-hidden col-span-12 sm:col-span-5 cursor-pointer"
              >
                <Image
                  src={IMG_3128}
                  removeWrapper
                  alt={`Gallery Image ${index + 1}`}
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                  onClick={() => openModal(IMG_3128)}
                />
                <CardFooter className="overflow-hidden absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 justify-between">
                  <div>
                    <p className="text-white text-lg">Room {room.roomNumber}</p>
                    <p className="text-white text-tiny capitalize">
                      {room.floor} floor
                    </p>
                  </div>
                  <Button
                    isDisabled={room.status !== "available"}
                    className="text-tiny"
                    color={room.status === "available" ? "primary" : "danger"}
                    radius="full"
                    size="sm"
                    onClick={() => handleClick(room.id)}
                  >
                    {room.status === "available" ? "Available" : "Reserved"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}
      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeModal}
        contentLabel="Zoomed Image"
        style={customStyles}
      >
        {selectedImage && (
          <div className=" rounded-md overflow-hidden">
            <img
              src={selectedImage}
              alt="Zoomed Image"
              className="w-[400px] h-[400px] object-contain overflow-hidden"
            />
          </div>
        )}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white bg-slate-800 w-6 rounded-full font-Montserrat flex items-center justify-center"
        >
          x
        </button>
      </Modal>
    </div>
  );
};

export default TwinStandardComp;
