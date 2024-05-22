import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { role, userLogin } = useAuth();
  const navigate = useNavigate();
  const loginForm = useRef(null);

  //  eye icon password input
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {}, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;
    const userInfo = { email, password };
    userLogin(userInfo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={loginForm}
      className="w-full h-full flex flex-col gap-3 px-10 py-6 bg-[#ffffff]"
    >
      <div className="flex flex-col gap-2 ">
        <label htmlFor="email" className="text-tiny text-[#333A73]">
          Email
        </label>
        <Input
          id="email"
          autoFocus
          isRequired
          isClearable
          variant="bordered"
          color="primary"
          radius="sm"
          size="md"
          type="email"
          className="w-full text-[#333A73] "
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onClear={() => setEmail("")}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-tiny text-[#333A73]">
          Password
        </label>

        <Input
          id="password"
          isRequired
          autoComplete="off"
          variant="bordered"
          color="primary"
          radius="sm"
          size="md"
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
      </div>

      <Button
        type="submit"
        size="md"
        className=" rounded-md bg-[#333A73] text-white"
      >
        Login
      </Button>

      {/* <div className="my-6">
        <p className="text-[#333A73]">
          Don&apos;t have an account?{" "}
          <Link to="/register" className=" text-blue-500  hover:underline">
            Register here.
          </Link>{" "}
        </p>
      </div> */}
    </form>
  );
};

export default UserLogin;
