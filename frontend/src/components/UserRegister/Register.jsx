import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

const UserRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerForm = useRef(null);
  const { registerUser } = useAuth();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("First name is required *"),
    email: yup
      .string()
      .required("Email is required *")
      .email("Invalid email format *"),
    address: yup.string(),
    phone: yup
      .string()
      .matches(/^\+?\d{8,14}$/, "Invalid phone number")
      .required("Phone is required"),
    password: yup
      .string()
      .required("Password is required *")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character *"
      ),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    // data.preventDefault();
    console.log({ ...data });
    // const name = registerForm.current.name.value;
    // const email = registerForm.current.email.value;
    // const password1 = registerForm.current.password1.value;
    // const password2 = registerForm.current.password2.value;

    const userInfo = { ...data };
    console.log(userInfo);
    registerUser(userInfo);
  };

  return (
    <form
      ref={registerForm}
      onSubmit={handleSubmit(onSubmit)}
      className="py-6 px-10 w-full flex flex-col gap-2 rounded-lg border bg-[#ffffff] shadow-lg"
      autoComplete="off"
    >
      <h2 className="text-[30px] mb-8 font-bold text-center text-[#333A73]">
        Register
      </h2>
      <div>
        <div className="flex items-center justify-center gap-4">
          <div className="mb-1 w-full">
            <Input
              autoFocus
              isRequired
              isClearable
              label="Name"
              size="sm"
              variant="bordered"
              color="primary"
              type="text"
              id="name"
              {...register("name")}
              className={`w-full ${
                errors.name ? "focus:border-red-500" : "focus:border-green-500"
              }`}
            />
            <div className=" h-2">
              {errors.name && (
                <p className="text-red-500 text-[10px]">
                  {errors.name?.message}
                </p>
              )}
            </div>
          </div>

          {/* ---- EMAIL ---- */}
          <div className=" w-full">
            <Input
              isRequired
              isClearable
              variant="bordered"
              color="primary"
              size="sm"
              label="Email"
              type="email"
              id="email"
              {...register("email")}
              className={`w-full ${
                errors.email ? "focus:border-red-500" : "focus:border-green-500"
              }`}
            />
            {/* errors */}
            <div className=" h-2 mt-1">
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
          </div>
          {/* ---- EMAIL ---- */}
        </div>
        <div className="flex gap-4">
          <div className=" w-full">
            <Input
              isRequired
              isClearable
              variant="bordered"
              color="primary"
              size="sm"
              label="Phone"
              type="tel"
              id="phone"
              {...register("phone")}
              className={`w-full ${
                errors.phone ? "focus:border-red-500" : "focus:border-green-500"
              }`}
            />
            <div className=" h-2">
              {errors.phone && (
                <p className="text-red-500 text-[10px]">
                  {errors.phone?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-1 w-full">
            <Input
              isRequired
              isClearable
              variant="bordered"
              color="primary"
              size="sm"
              label="Address"
              type="text"
              id="address"
              {...register("address")}
              className={`w-full ${
                errors.address
                  ? "focus:border-red-500"
                  : "focus:border-green-500"
              }`}
            />
            <div className=" h-2 mt-1">
              {errors.address && (
                <p className="text-red-500 text-[10px] mt-1">
                  {errors.address?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className=" w-full flex gap-4">
          {/* ---- PASSWORD ---- */}
          <div className="mb-4 relative w-full">
            <Input
              isRequired
              variant="bordered"
              color="primary"
              size="sm"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              className={`w-full ${
                errors.password
                  ? "focus:border-red-500"
                  : "focus:border-green-500"
              }`}
              endContent={
                <button
                  className="focus:outline-none text-[#333A73] "
                  type="button"
                  onClick={toggleShowPassword}
                >
                  {" "}
                  {showPassword ? (
                    <EyeSlashFilledIcon
                      onClick={toggleShowPassword}
                      className="text-2xl text-default-400 cursor-pointer"
                    />
                  ) : (
                    <EyeFilledIcon
                      onClick={toggleShowPassword}
                      className="text-2xl text-default-400 cursor-pointer"
                    />
                  )}
                </button>
              }
            />

            {/* errors */}
            <div className=" h-2 mt-1">
              {errors.password && (
                <p className="text-red-500 text-[10px] mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </div>
          {/* ---- PASSWORD ---- */}
          {/* ---- CONFIRM PASSWORD ---- */}
          <div className="mb-4 relative w-full">
            <Input
              isRequired
              variant="bordered"
              color="primary"
              size="sm"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword")}
              className={`w-full ${
                errors.confirmPassword
                  ? "focus:border-red-500"
                  : "focus:border-green-500"
              }`}
              endContent={
                <button
                  className="focus:outline-none text-[#333A73] "
                  type="button"
                  onClick={toggleShowConfirmPassword}
                >
                  {" "}
                  {showConfirmPassword ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 cursor-pointer" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 cursor-pointer" />
                  )}
                </button>
              }
            />

            {/* errors */}
            <div className=" h-2 mt-1">
              {errors.confirmPassword && (
                <p className="text-red-500 text-[10px]">
                  Passwords don&apos;t match *
                </p>
              )}
            </div>
          </div>
        </div>
        {/* ---- CONFIRM PASSWORD ---- */}
      </div>
      <Button
        size="md"
        type="submit"
        className="w-full rounded-md bg-[#333A73] text-white"
      >
        Register
      </Button>
      <div className="my-6">
        <p className="text-[#333A73]">
          {" "}
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here.
          </Link>{" "}
        </p>
      </div>
    </form>
  );
};

export default UserRegister;
