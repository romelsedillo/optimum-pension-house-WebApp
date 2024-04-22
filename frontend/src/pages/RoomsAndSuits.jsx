import Rooms from "../components/Rooms/rooms";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/footer";
const RoomsAndSuits = () => {
  return (
    <>
      <NavBar />
      <div className=" w-full px-36 py-10">
        <Rooms></Rooms>
      </div>
      <Footer />
    </>
  );
};

export default RoomsAndSuits;
