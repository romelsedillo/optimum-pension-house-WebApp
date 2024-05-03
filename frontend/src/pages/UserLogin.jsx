import Login from "../components/UserLogin/Login";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const UserLogin = () => {
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
      <div className=" h-screen flex justify-center w-full px-36 py-12">
        <div className=" w-2/5">
          <Login />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLogin;
