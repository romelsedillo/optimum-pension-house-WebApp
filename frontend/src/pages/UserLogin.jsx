import Login from "../components/UserLogin/Login";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/footer";
const UserLogin = () => {
  return (
    <>
      <NavBar />
      <div className="flex justify-center w-full px-36 py-12">
        <div className=" w-2/5">
          <Login />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserLogin;
