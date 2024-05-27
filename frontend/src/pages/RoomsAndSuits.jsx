import Rooms from "../components/Rooms/rooms";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/footer";
const RoomsAndSuits = () => {
  return (
    <div className="mt-20">
      <NavBar />
      <div className=" w-full px-36 py-10">
        <Rooms />
      </div>
      <Footer />
    </div>
  );
};

export default RoomsAndSuits;
