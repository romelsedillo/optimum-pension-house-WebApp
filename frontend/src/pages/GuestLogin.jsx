import Login from "../components/UserLogin/Login";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import Logo from "../components/Logo/Logo";
import loginImage from "../assets/images/login-image.jpg";

const GuestLogin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="mt-20 bg-[#fff]">
      <NavBar />
      <div className=" h-screen flex justify-center w-full px-36 py-12">
        <div className="w-full flex shadow-lg">
          <div
            className="w-1/2 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${loginImage})` }}
          >
            <div className=" bg-[#333A73] bg-opacity-70 w-full h-full flex flex-col items-center justify-center gap-16">
              <div className="flex flex-col items-center">
                <Logo w="16" h="16" />
                <h1 className="capitalize text-md text-white">
                  Optimum Pension House
                </h1>
              </div>
              <div className="text-center">
                <h1 className="text-white text-4xl">Welcome!</h1>
                <h6 className="font-bold text-white">
                  We are happy to see you again.
                </h6>
              </div>
            </div>
          </div>

          <div className=" w-1/2">
            <div className="mt-8">
              <h1 className="text-center text-[30px] font-bold text-[#333A73] ">
                Login.
              </h1>
            </div>
            <div>
              <Login />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GuestLogin;
