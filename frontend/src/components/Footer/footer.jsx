import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faGoogle,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Logo from "../Logo/Logo";

const footer = () => {
  return (
    <footer className="bg-[#F6F5F2] w-[100%] flex justify-center items-center">
      <div className="w-[85%] flex items-start justify-between text-[#333A73]">
        <div className="w-[25%] pr-4 flex flex-col items-end mt-12">
          <div className="">
            <Logo w="10" h="10" />
          </div>
          <h1 className=" text-[12px] text-orange-500">
            Optimum Pension House
          </h1>
          <p className="text-[10px]">All rights Reserved | &#169; 2024</p>
        </div>
        <span className="text-[100px] font-thin">|</span>
        <div className="w-[25%] px-4 mt-12">
          <h1 className="text-[18px]">Contact Us</h1>
          <div>
            <div className="flex gap-2">
              <i className="text-[12px]">
                <FontAwesomeIcon icon={faPhone} />
              </i>
              <p className="text-[12px]">+63917 317 9158</p>
            </div>
            <div className="flex gap-2">
              <i className="text-[12px]">
                <FontAwesomeIcon icon={faEnvelope} />
              </i>
              <p className="text-[12px]">optimumpensionhouse@gmail.com</p>
            </div>
          </div>
        </div>
        <span className="text-[100px] font-thin">|</span>
        <div className="w-[25%] px-4 mt-12">
          <h1 className="text-[18px]">Follow Us</h1>
          <div className="flex justify-between w-full">
            <a href="https://www.facebook.com/optimumpensionhouse">
              <i>
                <FontAwesomeIcon icon={faFacebook} />
              </i>
            </a>
            <a href="https://www.facebook.com/optimumpensionhouse">
              <i>
                <FontAwesomeIcon icon={faInstagram} />
              </i>
            </a>
            <a href="https://www.facebook.com/optimumpensionhouse">
              <i>
                <FontAwesomeIcon icon={faGoogle} />
              </i>
            </a>
            <a href="https://www.facebook.com/optimumpensionhouse">
              <i>
                <FontAwesomeIcon icon={faTiktok} />
              </i>
            </a>
          </div>
        </div>
        <span className="text-[100px] font-thin">|</span>
        <div className="w-[25%] pl-4 mt-12 ">
          <h1 className="text-[18px]">Address</h1>
          <p className="text-[12px]">
            Mariño Compound, Capitol Area, Daro, Dumaguete City, 6200 Negros
            Oriental
          </p>
        </div>
      </div>
    </footer>
  );
};

export default footer;
