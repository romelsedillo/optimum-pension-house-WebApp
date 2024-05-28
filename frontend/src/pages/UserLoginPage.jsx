import UserLogin from "../components/UserLogin/UserLogin";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import Logo from "../components/Logo/Logo";
import loginImage from "../assets/images/login-image.jpg";

const UserLoginPage = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className=" bg-[#fff]">
      <NavBar />
      <div className="flex justify-center w-full px-4 py-8 sm:px-6 md:px-12 lg:px-24 xl:px-36">
        <div className="w-full flex flex-col lg:flex-row shadow-lg">
          <div
            className="w-full lg:w-1/2 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${loginImage})` }}
          >
            <div className="bg-[#333A73] bg-opacity-70 w-full h-full flex flex-col items-center justify-center gap-8 lg:gap-16 p-4">
              <div className="flex flex-col items-center">
                <Logo w="16" h="16" />
                <h1 className="capitalize text-md text-white">
                  Optimum Pension House
                </h1>
              </div>
              <div className="text-center">
                <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl">
                  Welcome!
                </h1>
                <h6 className="font-bold text-white">
                  We are happy to see you again.
                </h6>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-4 lg:p-8">
            <div className="mt-8">
              <h1 className="text-center text-2xl sm:text-3xl lg:text-[30px] font-bold text-[#333A73]">
                User Login
              </h1>
            </div>
            <div className="mt-4">
              <UserLogin />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLoginPage;
