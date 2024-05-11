import React from "react";
import image1 from "../../assets/OPH/images/image1.jpg";
import image2 from "../../assets/OPH/images/image2.jpg";
import image3 from "../../assets/OPH/images/image3.jpg";
import image4 from "../../assets/OPH/images/image4.jpg";
import image5 from "../../assets/OPH/images/image5.jpg";
import image6 from "../../assets/OPH/images/image6.jpg";
import image7 from "../../assets/OPH/images/image7.jpg";
import image8 from "../../assets/OPH/images/image8.jpg";
import image9 from "../../assets/OPH/images/image9.jpg";
import image10 from "../../assets/OPH/images/image10.jpg";
import image11 from "../../assets/OPH/images/image11.jpg";
import image12 from "../../assets/OPH/images/image12.jpg";
import image13 from "../../assets/OPH/images/image13.jpg";
import image14 from "../../assets/OPH/images/image14.jpg";
import image15 from "../../assets/OPH/images/image15.jpg";
import image16 from "../../assets/OPH/images/image16.jpg";
import image17 from "../../assets/OPH/images/image17.jpg";
import image18 from "../../assets/OPH/images/image18.jpg";
// import image19 from "../../assets/OPH/images/image19.jpg";
import image20 from "../../assets/OPH/images/image20.jpg";
import image21 from "../../assets/OPH/images/image21.jpg";
import image22 from "../../assets/OPH/images/image22.jpg";
import image23 from "../../assets/OPH/images/image23.jpg";
import image24 from "../../assets/OPH/images/image24.jpg";
import image25 from "../../assets/OPH/images/image25.jpg";
import image26 from "../../assets/OPH/images/image26.jpg";
import { Image } from "@nextui-org/react";

const GalleryComponent = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <Image
          isZoomed
          width={362}
          alt="NextUI Fruit Image with Zoom"
          src={image1}
          className=" z-0"
        />
        <Image
          isZoomed
          width={365}
          alt="NextUI Fruit Image with Zoom"
          src={image2}
          className=" z-0"
        />
        <div className="flex flex-col gap-2">
          <Image
            isZoomed
            width={400}
            alt="NextUI Fruit Image with Zoom"
            src={image3}
            className=" z-0"
          />
          <Image
            isZoomed
            width={400}
            alt="NextUI Fruit Image with Zoom"
            src={image6}
            className=" z-0"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Image
          isZoomed
          width={365}
          alt="NextUI Fruit Image with Zoom"
          src={image4}
          className=" z-0"
        />
        <div className="flex flex-col gap-2">
          <Image
            isZoomed
            width={400}
            alt="NextUI Fruit Image with Zoom"
            src={image5}
            className=" z-0"
          />
          <Image
            isZoomed
            width={400}
            alt="NextUI Fruit Image with Zoom"
            src={image7}
            className=" z-0"
          />
        </div>

        <Image
          isZoomed
          width={365}
          alt="NextUI Fruit Image with Zoom"
          src={image9}
          className=" z-0"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col gap-2">
          <Image
            isZoomed
            width={400}
            alt="NextUI Fruit Image with Zoom"
            src={image11}
            className=" z-0"
          />
          <Image
            isZoomed
            width={400}
            alt="NextUI Fruit Image with Zoom"
            src={image10}
            className=" z-0"
          />
        </div>
        <Image
          isZoomed
          width={346}
          alt="NextUI Fruit Image with Zoom"
          src={image12}
          className=" z-0"
        />
        <Image
          isZoomed
          width={346}
          alt="NextUI Fruit Image with Zoom"
          src={image13}
          className=" z-0"
        />
      </div>
    </div>
  );
};

export default GalleryComponent;
