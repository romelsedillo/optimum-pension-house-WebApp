// Define the function
export function transformDate(dateString) {
  // Parse the input date string
  const date = new Date(dateString);

  // Extract the year, month, and day parts
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  // Return the formatted date string
  return `${year}-${month}-${day}`;
}
