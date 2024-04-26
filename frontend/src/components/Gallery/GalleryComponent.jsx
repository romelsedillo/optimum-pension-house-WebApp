import { useState } from "react";
import Modal from "react-modal";

import bedroom3 from "./Images/bedroom3.jpg";
import bedroom4 from "./Images/bedroom4.jpg";
import double from "./Images/double.jpg";
import double3 from "./Images/double3.jpg";
import housekeeper1 from "./Images/house-keeper-1.jpg";
import housekeeper2 from "./Images/house-keeper-2.jpg";
import housekeeper3 from "./Images/house-keeper-3.jpg";
import manager from "./Images/manager.jpg";
import receptionist1 from "./Images/receptionist-1.jpg";
import receptionist2 from "./Images/receptionist-2.jpg";
import singleBed from "./Images/single-bed.jpg";
import singleBed2 from "./Images/single-bed 2.jpg";
import singleBed3 from "./Images/single-bed 3.jpg";
import singleBed4 from "./Images/single-bed 4.jpg";
import twinBed1 from "./Images/twin bed 1.jpg";

const GalleryComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Replace these image URLs with your actual image URLs
  const imageUrls = [
    bedroom3,
    bedroom4,
    double,
    double3,
    housekeeper1,
    housekeeper2,
    housekeeper3,
    manager,
    receptionist1,
    receptionist2,
    singleBed,
    singleBed2,
    singleBed3,
    singleBed4,
    twinBed1,
    // Add more image URLs as needed
  ];

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
    <div className="container mx-auto p-4">
      <div>
        <h1 className=" font-Poppins text-[40px]">Gallery</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-md cursor-pointer"
          >
            <img
              src={imageUrl}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-48 object-cover"
              onClick={() => openModal(imageUrl)}
            />
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeModal}
        contentLabel="Zoomed Image"
        style={customStyles}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Zoomed Image"
            className="w-[400px] h-[400px] object-contain"
          />
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

export default GalleryComponent;
