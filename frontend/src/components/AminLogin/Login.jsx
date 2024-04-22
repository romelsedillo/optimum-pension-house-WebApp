// Login For Admin

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";

const Login = () => {
  const { role, loginUser } = useAuth();
  const navigate = useNavigate();
  const loginForm = useRef(null);

  //  eye icon password input
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    console.log("Admin State:", role);
    if (role === "admin") {
      console.log("admin login");
    }
  }, [role, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;

    const userInfo = { email, password };

    loginUser(userInfo);
    // showToastMessage();
  };

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          ref={loginForm}
          className="w-[100%] flex flex-col gap-5 px-10 py-12 rounded-lg bg-[#fff] border"
        >
          <h1 className="text-center text-[30px] font-bold text-[#7828C8]">
            Hello Admin!
          </h1>
          <div>
            <Input
              value={"romel@gmail.com"}
              isRequired
              isClearable
              variant="bordered"
              color="primary"
              size="sm"
              type="email"
              label="Email"
              className="w-full"
              name="email"
            />
          </div>

          <div>
            <Input
              value={"sedillo19"}
              isRequired
              label="Password"
              variant="bordered"
              color="primary"
              size="sm"
              name="password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="w-full outline-none"
            />
          </div>

          <Button
            type="submit"
            color="secondary"
            size="md"
            className=" rounded-md"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
