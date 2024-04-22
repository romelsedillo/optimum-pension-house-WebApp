import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";

// import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
      <h1 className="text-center text-[30px] font-bold text-[#7828C8]">
        Hello!
      </h1>
      <h6 className="text-center text-sm font-bold text-[#676666] mb-3">
        We are happy to see you again!
      </h6>
        <Input
          autoFocus
          isRequired
          isClearable
          variant="bordered"
          color="secondary"
          size="sm"
          type="email"
          label="Email"
          className="w-full"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onClear={() => setEmail("")}
        />

        <Input
          isRequired
          label="Password"
          variant="bordered"
          color="secondary"
          size="sm"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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

      <Button type="submit" color="secondary" size="md" className=" rounded-md">
        Login
      </Button>

      <div className="my-2 text-center">
        <p>Don&apos;t have an account?</p>
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register here.
        </Link>
      </div>
    </form>
  );
};

export default Login;
