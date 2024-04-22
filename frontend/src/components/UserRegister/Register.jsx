import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@nextui-org/react";

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
      className="pt-6 pb-4 px-8 w-full flex flex-col rounded-lg border bg-[#ffffff]"
      autoComplete="off"
    >
      <h2 className="text-2xl mb-2 font-semibold text-center text-violet-600">
        Register
      </h2>
      <div className="flex items-center justify-center gap-10">
        <div className="mb-1 w-full">
          <label
            htmlFor="name"
            className="block text-green-500 text-sm font-medium mb-1"
          >
            Name:
          </label>
          <input
            autoFocus
            type="text"
            id="name"
            {...register("name")}
            className={`w-full px-3 py-2 border-2 rounded-md shadow-sm focus:outline-none ${
              errors.name ? "focus:border-red-500" : "focus:border-green-500"
            }`}
          />
          <div className=" h-2 mt-1">
            {errors.name && (
              <p className="text-red-500 text-[10px]">{errors.name?.message}</p>
            )}
          </div>
        </div>

        {/* ---- EMAIL ---- */}
        <div className=" w-full">
          <label
            htmlFor="email"
            className="block text-green-500 text-sm font-medium mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full px-3 py-2 border-2 rounded-md shadow-sm focus:outline-none ${
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
      {/* <div className="hidden mb-1 w-full">
        <label
          htmlFor="labels"
          className="block text-green-500 text-sm font-medium mb-1"
        >
          labels :
        </label>
        <input value={""} type="text" id="phone" {...register("labels")} />
      </div> */}
      <div className="flex gap-10">
        <div className="mb-1 w-full">
          <label
            htmlFor="phone"
            className="block text-green-500 text-sm font-medium mb-1"
          >
            Phone :
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            className={`w-full px-3 py-2 border-2 rounded-md shadow-sm focus:outline-none ${
              errors.phone ? "focus:border-red-500" : "focus:border-green-500"
            }`}
          />
          <div className=" h-2 mt-1">
            {errors.phone && (
              <p className="text-red-500 text-[10px] mt-1">
                {errors.phone?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-1 w-full">
          <label
            htmlFor="address"
            className="block text-green-500 text-sm font-medium mb-1"
          >
            Address :
          </label>
          <input
            type="text"
            id="address"
            {...register("address")}
            className={`w-full px-3 py-2 border-2 rounded-md shadow-sm focus:outline-none ${
              errors.address ? "focus:border-red-500" : "focus:border-green-500"
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
      <div className=" w-full flex items-center justify-center gap-10">
        {/* ---- PASSWORD ---- */}
        <div className="mb-4 relative w-full">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password")}
            className={`w-full px-3 py-2 border-2 rounded-md shadow-sm focus:outline-none ${
              errors.password
                ? "focus:border-red-500"
                : "focus:border-green-500"
            }`}
          />
          <div
            className={`absolute inset-y-0 right-0 flex items-center pr-2 mt-10 opacity-50 ${
              errors.password
                ? "transform translate-y-[-12px]"
                : "transform translate-y-[-12px]"
            }`}
          >
            {showPassword ? (
              <FaEyeSlash
                onClick={toggleShowPassword}
                className="cursor-pointer"
              />
            ) : (
              <FaEye onClick={toggleShowPassword} className="cursor-pointer" />
            )}
          </div>
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
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Confirm password:
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            {...register("confirmPassword")}
            className={`w-full px-3 py-2 border-2 rounded-md shadow-sm focus:outline-none ${
              errors.confirmPassword
                ? "focus:border-red-500"
                : "focus:border-green-500"
            }`}
          />
          <div
            className={`absolute inset-y-0 right-0 flex items-center pr-2 mt-14 opacity-50 ${
              errors.confirmPassword
                ? "transform translate-y-[-20px]"
                : "transform translate-y-[-20px]"
            }`}
          >
            {showConfirmPassword ? (
              <FaEyeSlash
                onClick={toggleShowConfirmPassword}
                className="cursor-pointer"
              />
            ) : (
              <FaEye
                onClick={toggleShowConfirmPassword}
                className="cursor-pointer"
              />
            )}
          </div>
          {/* errors */}
          <div className=" h-2 mt-1">
            {errors.confirmPassword && (
              <p className="text-red-500 text-[10px]">
                Passwords don&apos;t match *
              </p>
            )}
          </div>
        </div>
        {/* ---- CONFIRM PASSWORD ---- */}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full mt-2 py-2 px-4 bg-violet-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
        >
          Register
        </button>
      </div>
      <div className="my-2 text-center">
        <p> Already have an account?</p>
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login here.
        </Link>
      </div>
    </form>
  );
};

export default UserRegister;
