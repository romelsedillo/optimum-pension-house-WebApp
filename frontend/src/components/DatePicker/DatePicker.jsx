import React from "react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

const DatePicker = ({ onDateRangeChange }) => {
    const [value, setValue] = React.useState({
        start: null,
        end: null,
      });

  let formatter = useDateFormatter({ dateStyle: "long" });

  // Function to handle date range change and call the parent function
  const handleDateChange = (newValue) => {
    setValue(newValue);
    onDateRangeChange(newValue); // Call the parent function with the new date range
  };

  return (
    <div className="w-full flex flex-col gap-y-2">
      <DateRangePicker
        size="sm"
        value={value}
        onChange={handleDateChange} // Pass the function to handle date range change
      />
    </div>
  );
};

export default DatePicker;

{/* <p className="text-default-500 text-sm">
Selected date:{" "}
{value
  ? formatter.formatRange(
      value.start.toDate(getLocalTimeZone()),
      value.end.toDate(getLocalTimeZone()),
    )
  : "--"}
</p> */}