import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { Input } from "@nextui-org/react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalendarComp = ({ setCheckIn, setCheckOut }) => {
  const [checkInLocal, setCheckInLocal] = useState(new Date());
  const [checkOutLocal, setCheckOutLocal] = useState(addDays(new Date(), 1));
  const [open, setOpen] = useState(false);

  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
    return () => {
      document.removeEventListener("keydown", hideOnEscape, true);
      document.removeEventListener("click", hideOnClickOutside, true);
    };
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const toggleDatePicker = () => {
    setOpen(!open);
  };
  const handleRangeChange = (ranges) => {
    setCheckInLocal(ranges.selection.startDate);
    setCheckOutLocal(ranges.selection.endDate);
    setCheckIn(ranges.selection.startDate);
    setCheckOut(ranges.selection.endDate);
  };

  return (
    <div className="">
      <div className=" flex gap-2">
        <input
          value={`${format(checkInLocal, "EEEE, MMMM d, yyyy")}`}
          readOnly
          className="w-full px-2 py-2 text-sm border-[1px] cursor-pointer rounded-md text-blue-500 border-blue-500 hover:bg-blue-100 outline-none"
          onClick={toggleDatePicker}
        />
        <input
          value={`${format(checkOutLocal, "EEEE, MMMM d, yyyy")}`}
          readOnly
          className="w-full px-2 py-2 text-sm border-[1px] cursor-pointer rounded-md text-blue-500 border-blue-500 hover:bg-blue-100 outline-none"
          onClick={toggleDatePicker}
        />
      </div>
      <div
        className="w-full flex items-center justify-center text-red-500"
        ref={refOne}
      >
        {open && (
          <DateRange
            onChange={handleRangeChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={[
              {
                startDate: checkInLocal,
                endDate: checkOutLocal,
                key: "selection",
              },
            ]}
            months={1}
            direction="horizontal"
            minDate={new Date()}
            shownDate={new Date()}
            className="rounded-md border border-blue-500 w-full flex justify-center"
          ></DateRange>
        )}
      </div>
    </div>
  );
};

export default CalendarComp;
