import frontdesk from "../../assets/images/frontdesk.jpg";

const AboutUs = () => {
  return (
    <div className="p-8 my-32 mx-24 flex gap-[50px] w-[100%] bg-[#F6F5F2] rounded-md text-[#333A73]">
      <div className="w-[50%] border">
        <img
          src={frontdesk}
          alt="frontdesk image"
          className="w-[100%] rounded-md"
        />
      </div>
      <div className="w-[50%] flex flex-col gap-2">
        <div>
          <p className=" capitalize font-Manrope font-medium">
            hotel frontdesk
          </p>
          <h1 className=" text-[35px] text-center font-DMSerifDisplay ">
            About Us
          </h1>
          <p className=" text-[12px] text-justify leading-5">
            <span className="  text-[28px] font-DMSerifDisplay font-medium">
              Welcome{" "}
            </span>
            to{" "}
            <span className=" text-orange-500 font-DMSerifDisplay text-[20px]">
              Optimum Pension House
            </span>
            , where hospitality meets a rich tapestry of history and
            contemporary luxury. Established in 2000, our hotel has been a
            beacon of refined elegance and exceptional service for 23 years.
          </p>
        </div>
        <div>
          <h1 className=" text-[35px] text-center font-DMSerifDisplay">
            Our Story
          </h1>
          <p className=" text-[12px] text-justify leading-5">
            <span className="text-[28px] font-DMSerifDisplay font-medium">
              At{" "}
            </span>
            <span className=" text-orange-500 font-DMSerifDisplay text-[20px]">
              Optimum Pension House
            </span>
            , we believe in creating memorable experiences that go beyond
            traditional hospitality. Our story began with a vision to provide a
            sanctuary for travelers, blending classic charm with modern
            comforts. Over the years, we have evolved into a cherished
            destination for discerning guests seeking a perfect blend of
            sophistication and warmth.
          </p>
        </div>
        <div>
          <h1 className=" text-[35px] text-center font-DMSerifDisplay">
            Our Mission
          </h1>
          <p className=" text-[12px] text-justify leading-5">
            <span className="text-[28px] font-DMSerifDisplay font-medium border-b-1 border-orange-500">
              Driven
            </span>{" "}
            by a passion for excellence, our mission is to exceed the
            expectations of every guest. We are committed to delivering
            unparalleled service, ensuring that each stay with us is a journey
            of indulgence and relaxation. Your comfort and satisfaction are at
            the heart of everything we do.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className=" text-[35px] text-center font-DMSerifDisplay">
            Our Values
          </h1>

          <p className="text-[12px]">
            <span className="font-DMSerifDisplay font-medium text-[14px] border-b-1 border-orange-500">
              Hospitality
            </span>
            : We embrace guests with genuine warmth, creating an inviting
            atmosphere that feels like a home away from home.
          </p>

          <p className="text-[12px]">
            <span className="font-DMSerifDisplay font-medium text-[14px] border-b-1 border-orange-500">
              Integrity
            </span>
            : We operate with honesty, transparency, and a commitment to the
            highest ethical standards.
          </p>

          <p className="text-[12px]">
            <span className="font-DMSerifDisplay text-[14px] border-b-1 border-orange-500">
              Innovation
            </span>
            : Striving for continuous improvement, we embrace innovation to
            enhance the guest experience and stay ahead in the ever-evolving
            hospitality landscape.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
