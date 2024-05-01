import {
  // Navbar,
  // NavbarBrand,
  // NavbarContent,
  // NavbarItem,
  // Link,
  Button,
} from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/Navbar";
import AboutUs from "../components/AboutUs/AboutUs";
import Footer from "../components/Footer/footer";
import MapComponent from "../components/MapComponent/MapComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// import GoogleMap from "../components/GoogleMap/Map";
// import Teams from "../components/Teams/Teams";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToRooms = () => {
    navigate("/rooms");
  };

  
  return (
    <div className="mt-20">
      <NavBar />
      <div
        name="home"
        className="  bg-[#F6F5F2] h-screen w-full flex justify-start"
      >
        <div className=" flex mt-[80px] ml-40 flex-col items-start gap-8">
          <div className="text-[#333A73]">
            <p className=" font-medium">Welcome to</p>
            <h1 className="title text-[50px] text-orange-500 font-DMSerifDisplay">
              Optimum Pension House
            </h1>

            <p className=" text-[20px] font-Manrope">
              Indulge in Unparalleled Comfort
            </p>
            <p className="text-[20px] font-Manrope">
              Where Every Stay is a Celebration
            </p>
          </div>
          <Button
            size="lg"
            className="bg-orange-500 text-[#fff] rounded-md"
            onClick={handleNavigateToRooms}
          >
            Book Your Stay Now
          </Button>
        </div>
      </div>
      <div className="flex justify-center bg-slate-200">
        <AboutUs />
      </div>
      <div className="w-[100%] p-32 bg-white">
        <div className=" bg-[#F6F5F2] flex rounded-lg">
          <div className="w-1/3 flex flex-col justify-start gap-4 p-8">
            <h1 className="text-2xl mt-14 text-left">Location & Map</h1>
            <p className="text-[12px]">
              <span>
                <FontAwesomeIcon icon={faLocationDot} />
              </span>{" "}
              Mariño Compound, Capitol Area, Daro, Dumaguete City, 6200 Negros
              Oriental
            </p>
            <NavLink
              to={
                "https://maps.google.com/maps?ll=9.314605,123.304079&z=16&t=m&hl=en&gl=PH&mapclient=embed&cid=13524786316671096408"
              }
            >
              <Button size="sm" className="bg-orange-500 text-white rounded-sm">
                View location <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </NavLink>
          </div>
          <div className="w-2/3">
            <MapComponent />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

// <div className="w-[100%] p-32">
//   <Teams />
// </div>
