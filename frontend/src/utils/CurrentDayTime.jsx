export const getCurrentDateTime = () => {
  const currentDate = new Date();

  const dateString = currentDate.toDateString(); // Get the date string
  const timeString = currentDate.toTimeString().split(" ")[0]; // Get the time string without milliseconds and timezone

  const dateTimeString = `${dateString} ${timeString}`;

  return dateTimeString;
};
