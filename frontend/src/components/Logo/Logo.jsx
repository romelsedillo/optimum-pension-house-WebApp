import oph from "../../assets/images/oph.jpg";

const Logo = ({w, h}) => {
  return (
    <img
      src={oph}
      alt="OPH Logo"
      className={`w-[${w}] h-${h} rounded-full`}
    />
  );
};

export default Logo;
