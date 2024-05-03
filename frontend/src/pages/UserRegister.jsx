import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import Register from "../components/UserRegister/Register";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/footer";

const UserRegister = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="mt-20">
      <NavBar />
      <div className="h-screen w-full flex justify-center px-36 py-10 ">
        <div className="w-1/2">
          <Register />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserRegister;
