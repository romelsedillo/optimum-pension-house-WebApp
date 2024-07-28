import frontdesk from "../../assets/images/frontdesk.jpg";

const AboutUs = () => {
  return (
    <div className="p-20 my-32 flex flex-col md:flex-row gap-[50px] w-full bg-[#F6F5F2] rounded-md text-[#333A73]">
      <div className=" border">
        <img
          src={frontdesk}
          alt="front desk image"
          className=" rounded-md w-[600px]"
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col gap-2">
        <div className="flex flex-col">
          <p className=" capitalize font-Manrope font-medium">
            hotel front desk
          </p>
          <h1 className=" text-4xl text-center font-DMSerifDisplay ">
            About Us
          </h1>
          <p className=" text-sm text-justify leading-5">
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
          <h1 className=" text-4xl text-center font-DMSerifDisplay">
            Our Story
          </h1>
          <p className=" text-sm text-justify leading-5">
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
          <h1 className=" text-4xl text-center font-DMSerifDisplay">
            Our Mission
          </h1>
          <p className=" text-sm text-justify leading-5">
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
          <h1 className=" text-4xl text-center font-DMSerifDisplay">
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
