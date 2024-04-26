export const getCurrentDateTime = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Array of day names
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const month = monthNames[currentDate.getMonth()];
  const day = dayNames[currentDate.getDay()];

  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  const dateTimeString = `${day}, ${month} ${currentDate.getDate()}, ${year} ${hours}:${minutes}:${seconds}`;

  return dateTimeString;
};
