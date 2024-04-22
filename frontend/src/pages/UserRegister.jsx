import Register from "../components/UserRegister/Register";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/footer";
const UserRegister = () => {
  return (
    <>
      <NavBar />
      <div className="h-screen w-full flex justify-center px-36 py-10 bg-[#E2E8F0]">
        <div className="w-1/2">
          <Register />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserRegister;
