import manager from "../../assets/images/manager.jpg";
import receptionis1 from "../../assets/images/receptionist-1.jpg";

const Teams = () => {
  return (
    <div className="w-[100%] flex flex-col gap-[50px] bg-white rounded-md">
      <div className="w-[100%] flex gap-[40px]">
        <div className=" w-[50%] flex flex-col gap-4">
          <h1 className="text-[50px] font-CormorantGaramond italic text-right">
            Meet the Team
          </h1>
          <p className="text-[12px] text-justify leading-5">
            <span className="  text-[28px] font-CormorantGaramond italic font-bold">
              Behind{" "}
            </span>{" "}
            every exceptional experience is a team of dedicated professionals.
            Our staff, carefully selected for their passion and expertise, is
            committed to ensuring your stay is nothing short of extraordinary.
          </p>
          <p className="text-[12px] text-justify leading-5">
            <span className="  text-[28px] font-CormorantGaramond italic font-bold">
              Thank you{" "}
            </span>{" "}
            for considering{" "}
            <span className=" text-[#DD7210] text-[18px]">
              Optimum Pension House
            </span>{" "}
            for your next getaway. We look forward to welcoming you to our world
            of timeless elegance and unparalleled hospitality.
          </p>
          <div className="w-full flex justify-end">
            <img src={manager} alt="manager image" className="w-[200px]" />
          </div>
        </div>
        <div className=" w-[50%] flex gap-[30px]">
          <div className=" w-[50%] mt-[145px] flex flex-col gap-[40px]">
            <div className="flex justify-center">
              <img src={receptionis1} alt="" className="w-[200px]" />
            </div>
            <div className="flex justify-center">
              <img src={receptionis1} alt="" className="w-[200px]" />
            </div>
          </div>
          <div className=" w-[50%] mt-[] flex flex-col gap-[40px]">
            <div className="flex justify-center">
              <img src={receptionis1} alt="" className="w-[200px]" />
            </div>
            <div className="flex justify-center">
              <img src={receptionis1} alt="" className="w-[200px]" />
            </div>
            <div className="flex justify-center">
              <img src={receptionis1} alt="" className="w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
