import frontdesk from "../../assets/images/frontdesk.jpg";

const AboutUs = () => {
  return (
    <div className="p-8 my-32 mx-24 flex gap-[50px] w-[100%] bg-white rounded-md">
      <div className="w-[50%] border">
        <img
          src={frontdesk}
          alt="frontdesk image"
          className="w-[100%] rounded-md"
        />
      </div>
      <div className="w-[50%] flex flex-col gap-2">
        <div>
          <p className=" capitalize">hotel frontdesk</p>
          <h1 className=" text-[50px] text-center font-CormorantGaramond italic">About Us</h1>
          <p className=" text-[12px] text-justify leading-5">
            <span className="  text-[28px] font-CormorantGaramond italic font-bold">
              Welcome{" "}
            </span>
            to{" "}
            <span className=" text-[#DD7210] text-[18px]">
              Optimum Pension House
            </span>
            , where hospitality meets a rich tapestry of history and
            contemporary luxury. Established in 2000, our hotel has been a
            beacon of refined elegance and exceptional service for 23 years.
          </p>
        </div>
        <div>
          <h1 className=" text-[35px] text-center font-CormorantGaramond italic">Our Story</h1>
          <p className=" text-[12px] text-justify leading-5">
            <span className="text-[28px] font-CormorantGaramond italic font-bold">At </span>
            <span className=" text-[#DD7210] text-[18px]">
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
          <h1 className=" text-[35px] text-center font-CormorantGaramond italic">Our Mission</h1>
          <p className=" text-[12px] text-justify leading-5">
            <span className="text-[28px] font-CormorantGaramond italic font-bold">Driven </span>
             by a passion for excellence, our mission is to exceed the
            expectations of every guest. We are committed to delivering
            unparalleled service, ensuring that each stay with us is a journey
            of indulgence and relaxation. Your comfort and satisfaction are at
            the heart of everything we do.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className=" text-[35px] text-center font-CormorantGaramond italic">Our Values</h1>
          
              <p className="text-[12px]">
              <span className=" font-semibold text-[14px]">Hospitality: </span>
                We embrace guests with genuine warmth, creating an inviting
                atmosphere that feels like a home away from home.
              </p>
            
              <p className="text-[12px]">
              <span className=" font-semibold text-[14px]">Integrity: </span>
                We operate with honesty, transparency, and a commitment to the
                highest ethical standards.
              </p>
            
            
              <p className="text-[12px]">
              <span className=" font-semibold text-[14px]">Innovation: </span>
                Striving for continuous improvement, we embrace innovation to
                enhance the guest experience and stay ahead in the ever-evolving
                hospitality landscape.
              </p>
            
         
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
