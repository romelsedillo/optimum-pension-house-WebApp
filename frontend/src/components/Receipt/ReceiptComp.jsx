import { useParams } from "react-router-dom";
import oph from "../../assets/images/oph.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
const ReceiptComp = (props) => {
  const { reservationId } = useParams();

  // Find the reservation that matches the reservationId
  const reservation = props.data.find((item) => item.id === reservationId);

  // if (props.loading) {
  //   return <div>Preparing receipt...</div>;
  // }

  // if (!reservation) {
  //   return <div>Reservation not found</div>;
  // }

  return (
    <div className=" p-10 flex flex-col gap-6 text-[#333A73]">
      {/* headings */}
      <div className=" flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <img src={oph} alt="logo" className={`w-24 h-24 rounded-full`} />
            <h1 className="font-bold text-2xl">Optimum Pension House</h1>
          </div>

          <div className="flex flex-col">
            <p className="text-tiny font-semibold">
              Mariño Compound, Capitol Area, Daro, Negros Island, Dumaguete,
              6200
            </p>
            <p className="text-tiny font-semibold">optimumpensionhouse.com</p>
            <p className="text-tiny font-semibold">
              optimumpensionhouse@gmail.com
            </p>
            <p className="text-tiny font-semibold"> 0917 595 6027</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p>Date: _________________</p>
          <p>Receipt#: _________________</p>
        </div>
      </div>
      {/* headings */}
      {/* customer details */}
      <div className="flex flex-col">
        <div className="w-full justify-between items-center border border-[#333A73] py-1">
          <p className="font-bold text-center mb-2">Customer Details</p>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <div className="py-1 px-3 border border-t-0 border-r-0 border-[#333A73] w-1/4">
              <p className="mb-2">Name</p>
            </div>
            <div className="border border-t-0 border-[#333A73] w-3/4"></div>
          </div>
          <div className="flex">
            <div className="py-1 px-3 border border-t-0 border-r-0 border-[#333A73] w-1/4">
              <p className="mb-2">Address</p>
            </div>
            <div className="border border-t-0 border-[#333A73] w-3/4"></div>
          </div>
          <div className="flex">
            <div className="py-1 px-3 border border-t-0 border-r-0 border-[#333A73] w-1/4">
              <p className="mb-2">Phone</p>
            </div>
            <div className="border border-t-0 border-[#333A73] w-3/4"></div>
          </div>
        </div>
      </div>
      {/* customer details */}
      {/* reservation details */}
      <div>
        <div className="flex">
          <div className="w-full justify-between items-center border border-r-0 border-[#333A73] py-1">
            <p className="font-bold text-center mb-2">Room Details</p>
          </div>
          <div className="w-full justify-between items-center border border-r-0 border-[#333A73] py-1">
            <p className="font-bold text-center mb-2">Price/Night</p>
          </div>
          <div className="w-full justify-between items-center border border-r-0 border-[#333A73] py-1">
            <p className="font-bold text-center mb-2"># of Nights</p>
          </div>
          <div className="w-full justify-between items-center border border-[#333A73] py-1">
            <p className="font-bold text-center mb-2">Total Price</p>
          </div>
        </div>
        <div className="flex">
          <div className="h-8 w-full justify-between items-center border border-r-0 border-[#333A73] border-t-0 py-1">
            <p className="font-bold text-center"></p>
          </div>
          <div className="h-8 w-full justify-between items-center border border-r-0 border-[#333A73] border-t-0 py-1">
            <p className="font-bold text-center"></p>
          </div>
          <div className="h-8 w-full justify-between items-center border border-r-0 border-[#333A73] border-t-0 py-1">
            <p className="font-bold text-center"></p>
          </div>
          <div className="h-8 w-full justify-between items-center border border-[#333A73] border-t-0 py-1">
            <p className="font-bold text-center"></p>
          </div>
        </div>
        <div className="flex">
          <div className="h-8 w-full justify-between items-center border border-t-0 border-r-0 border-[#333A73] py-1">
            <p className="font-bold text-center"></p>
          </div>
          <div className="h-8 w-full justify-between items-center border border-t-0 border-r-0 border-[#333A73] py-1">
            <p className="font-bold text-center"></p>
          </div>
          <div className="h-8 w-full justify-between items-center border border-t-0 border-r-0 border-[#333A73] py-1">
            <p className="font-bold text-center"></p>
          </div>
          <div className="h-8 w-full justify-between items-center border border-t-0 border-[#333A73] py-1">
            <p className="font-bold text-center"></p>
          </div>
        </div>
        <div className="flex">
          <div className="h-8 w-full justify-between items-center border border-t-0 border-r-0 border-[#333A73] py-1">
            <p className="font-bold text-center"></p>
          </div>
          <div className="h-8 w-full justify-between items-center border border-t-0 border-r-0 border-[#333A73] py-1">
            <p className="font-bold text-center"></p>
          </div>
          <div className="h-8 w-full justify-between items-center border border-t-0 border-r-0 border-[#333A73] py-1">
            <p className="font-bold text-center"></p>
          </div>
          <div className="h-8 w-full justify-between items-center border border-t-0 border-[#333A73] py-1">
            <p className="font-bold text-center"></p>
          </div>
        </div>
        <div className="flex">
          <div className="h-8 w-full justify-between items-center border border-t-0 border-r-0 border-[#333A73] py-1">
            <p className="font-bold text-center"></p>
          </div>
          <div className="h-8 w-full justify-between items-center border border-t-0 border-r-0 border-[#333A73] py-1">
            <p className="font-bold text-center"></p>
          </div>
          <div className="h-8 w-full justify-between items-center border border-t-0 border-r-0 border-[#333A73] py-1">
            <p className="font-bold text-center"></p>
          </div>
          <div className="h-8 w-full justify-between items-center border border-t-0 border-[#333A73] py-1">
            <p className="font-bold text-center"></p>
          </div>
        </div>
      </div>
      {/* reservation details */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-4 font-bold ">
          <p>Payment Method :</p>
          <p>Remarks :</p>
        </div>
        <div className="flex flex-col w-1/2 items-center justify-center border">
          <div className="flex w-full border-1 border-b-0 border-[#333A73]">
            <div className="w-full items-center px-2">
              <p className="font-bold text-right">Subtotal</p>
            </div>
            <div className="w-full h-6 justify-between items-center border-l-1 border-[#333A73]">
              <p className="font-bold text-center"></p>
            </div>
          </div>
          <div className="flex w-full border-1 border-b-0 border-[#333A73]">
            <div className="w-full justify-between items-center px-2">
              <p className="font-bold text-right">Discount</p>
            </div>
            <div className="w-full h-6 justify-between items-center border-l-1 border-[#333A73]">
              <p className="font-bold text-center"></p>
            </div>
          </div>
          <div className="flex w-full border-1 border-b-0 border-[#333A73]">
            <div className="w-full justify-between items-center px-2">
              <p className="font-bold text-right">TAX / VAT</p>
            </div>
            <div className="w-full h-6 justify-between items-center border-l-1 border-[#333A73]">
              <p className="font-bold text-center"></p>
            </div>
          </div>
          <div className="flex w-full border-1 border-[#333A73]">
            <div className="w-full justify-between items-center px-2">
              <p className="font-bold text-right">Total Amount</p>
            </div>
            <div className="w-full h-6justify-between items-center border-l-1 border-[#333A73]">
              <p className="font-bold text-center"></p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-20 w-full mt-32">
        <p className="text-lg text-center font-bold">
          Thank you for choosing Optimum Pension House!
        </p>
      </div>
      <div className="w-full flex items-end justify-evenly text-tiny">
        <div className="flex gap-1 items-center">
          <FontAwesomeIcon icon={faPhone} />
          <p className=" text-tiny">0917 595 6027</p>
        </div>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon icon={faLocationDot} />
          <p className=" text-[10px]">
            Mariño Compound, Capitol Area, Daro, Negros Island, Dumaguete, 6200
          </p>
        </div>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon icon={faEnvelope} />
          <p className="">optimumpensionhouse@gmail.com</p>
        </div>
      </div>
      <hr className="bg-orange-500 h-1 border-none" />
    </div>
  );
};

export default ReceiptComp;
