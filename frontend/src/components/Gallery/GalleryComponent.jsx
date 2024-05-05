import { useState } from "react";
import Modal from "react-modal";

import bedroom3 from "./Images/bedroom3.jpg";


const GalleryComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const imageUrls = [
    bedroom3,
   
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
