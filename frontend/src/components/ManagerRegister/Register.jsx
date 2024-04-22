import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    // lastName: yup.string().required("Last name is required *"),
    // age: yup
    //   .number("Age must be a number. *")
    //   .typeError("Age must be a valid number. *")
    //   .positive("Age is invalid. *")
    //   .integer("Age is invalid. *")
    //   .required("Age is required. *"),
    // gender: yup.string().required("Gender is required. *"),
    email: yup
      .string()
      .required("Email is required *")
      .email("Invalid email format *"),
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

    registerUser(userInfo);
  };

  return (
    <form
      ref={registerForm}
      onSubmit={handleSubmit(onSubmit)}
      className="pt-6 pb-4 px-8 w-[100%] flex flex-col rounded-lg border bg-[#ffffff]"
      autoComplete="off"
    >
      <h2 className="text-2xl mb-2 font-semibold text-center">Register</h2>
      <div className="flex items-center justify-center gap-10">
        {/* ---- FIRST NAME ---- */}
        <div className="mb-1 w-full">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Name:
          </label>
          <input
            value={"jake"}
            type="text"
            id="name"
            {...register("name")}
            className={`w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none ${
              errors.name ? "focus:border-red-500" : "focus:border-green-500"
            }`}
          />
          <div className=" h-2 mt-1">
            {errors.name && (
              <p className="text-red-500 text-[10px]">{errors.name?.message}</p>
            )}
          </div>
        </div>
        {/* ---- FIRST NAME ---- */}
        {/* ---- LAST NAME ---- */}
        {/* <div className="mb-1 w-full">
          <label
            htmlFor="lastName"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Last name:
          </label>
          <input
            value={"smith1"}
            type="text"
            id="lastName"
            {...register("lastName")}
            className={`w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none ${
              errors.lastName
                ? "focus:border-red-500"
                : "focus:border-green-500"
            }`}
          />
          <div className="h-2 mt-1">
            {errors.lastName && (
              <p className="text-red-500 text-[10px] mt-1">
                {errors.lastName?.message}
              </p>
            )}
          </div>
        </div> */}
        {/* ---- LAST NAME ---- */}
      </div>
      <div className="flex items-center justify-center gap-10">
        {/* ---- AGE ---- */}
        {/* <div className="mb-4 w-full">
          <label
            htmlFor="age"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Age:
          </label>
          <input
            value={11}
            type="number"
            id="age"
            {...register("age")}
            className={`w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none ${
              errors.age ? "focus:border-red-500" : "focus:border-green-500"
            }`}
          />
          <div className=" h-2 mt-1">
            {errors.age && (
              <p className="text-red-500 text-[10px] mt-1">
                {errors.age?.message}
              </p>
            )}
          </div>
        </div> */}
        {/* ---- AGE ---- */}
        {/* ---- GENDER ---- */}
        {/* <div className="mb-4 w-full">
          <label
            htmlFor="gender"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Gender:
          </label>
          <select
            defaultValue={"male"}
            name="gender"
            id="gender"
            {...register("gender")}
            className={`w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none ${
              errors.gender ? "focus:border-red-500" : "focus:border-green-500"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div className=" h-2 mt-1">
            {errors.gender && (
              <p className="text-red-500 text-[10px] mt-1">
                {errors.gender?.message}
              </p>
            )}
          </div>
        </div> */}
        {/* ---- AGE ---- */}
      </div>
      {/* ---- EMAIL ---- */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-medium mb-1"
        >
          Email:
        </label>
        <input
          value={"jakesmith@gmail.com"}
          type="email"
          id="email"
          {...register("email")}
          className={`w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none ${
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
            value={"Sedillo_11"}
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password")}
            className={`w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none ${
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
            value={"Sedillo_11"}
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            {...register("confirmPassword")}
            className={`w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none ${
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

      <button
        type="submit"
        className="w-full mt-2 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
      >
        Register
      </button>
      {/* <input type="submit" value="Register" className="btn" /> */}

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
