import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { role, loginUser } = useAuth();
  const navigate = useNavigate();
  const loginForm = useRef(null);

  //  eye icon password input
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (role === "admin") {
      // navigate("/admin-dashboard/admins");
    } else if (role === "manager") {
      // navigate("/manager-dashboard/admins");
    } else if (role === "receptionist") {
      // navigate("/manager-dashboard/admins");
    } else if (role === "user") {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [role, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;
    const userInfo = { email, password };
    loginUser(userInfo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={loginForm}
      className="w-full flex flex-col gap-3 px-10 py-6 rounded-lg bg-[#ffffff] border shadow-lg"
    >
      <h1 className="text-center text-[30px] font-bold text-[#333A73] ">
        Hello!
      </h1>
      <h6 className="text-center text-sm font-bold text-[#333A73]  mb-3">
        We are happy to see you again!
      </h6>
      <Input
        autoFocus
        isRequired
        isClearable
        autoComplete="off"
        variant="bordered"
        color="primary"
        size="sm"
        type="email"
        label="Email"
        className="w-full text-[#333A73] "
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        onClear={() => setEmail("")}
      />

      <Input
        isRequired
        autoComplete="off"
        label="Password"
        variant="bordered"
        color="primary"
        size="sm"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        endContent={
          <button
            className="focus:outline-none text-[#333A73] "
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
        className="w-full"
      />

      <Button
        type="submit"
        size="md"
        className=" rounded-md bg-[#333A73] text-white"
      >
        Login
      </Button>

      <div className="my-6">
        <p className="text-[#333A73]">
          Don&apos;t have an account?{" "}
          <Link to="/register" className=" text-blue-500  hover:underline">
            Register here.
          </Link>{" "}
        </p>
      </div>
    </form>
  );
};

export default Login;
