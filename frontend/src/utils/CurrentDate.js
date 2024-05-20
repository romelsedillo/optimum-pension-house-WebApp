export const currentDate = () => {
  const currentDate = new Date();

  const dateString = currentDate.toDateString(); // Get the date string

  const dateTimeString = `${dateString}`;

  return dateTimeString;
};
export default currentDate;
