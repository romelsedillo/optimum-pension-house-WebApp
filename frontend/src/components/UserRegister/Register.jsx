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
        "Password must be at least 8 characters and include uppercase, number, and special character*."
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
      className="py-2 px-4 md:px-10 w-full flex flex-col rounded-lg bg-[#ffffff]"
      autoComplete="off"
    >
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="mb-4 md:w-1/2">
            <label htmlFor="name" className="text-tiny text-[#333A73]">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              autoFocus
              isRequired
              isClearable
              size="md"
              radius="sm"
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
          <div className="mb-4 md:w-1/2">
            <label htmlFor="email" className="text-tiny text-[#333A73]">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              isRequired
              isClearable
              variant="bordered"
              color="primary"
              size="md"
              radius="sm"
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="mb-4 md:w-1/2">
            <label htmlFor="phone" className="text-tiny text-[#333A73]">
              Phone <span className="text-red-500">*</span>
            </label>
            <Input
              isRequired
              isClearable
              variant="bordered"
              color="primary"
              size="md"
              radius="sm"
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
          <div className="mb-4 md:w-1/2">
            <label htmlFor="address" className="text-tiny text-[#333A73]">
              Address <span className="text-red-500">*</span>
            </label>
            <Input
              isRequired
              isClearable
              variant="bordered"
              color="primary"
              size="md"
              radius="sm"
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="mb-4 md:w-1/2">
            <label htmlFor="password" className="text-tiny text-[#333A73]">
              Password <span className="text-red-500">*</span>
            </label>
            <Input
              isRequired
              variant="bordered"
              color="primary"
              size="md"
              radius="sm"
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
          <div className="mb-4 md:w-1/2">
            <label
              htmlFor="confirmPassword"
              className="text-tiny text-[#333A73]"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <Input
              isRequired
              variant="bordered"
              color="primary"
              size="md"
              radius="sm"
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
