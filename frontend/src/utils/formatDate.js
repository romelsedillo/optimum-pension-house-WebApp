export default function formatDate(dateString) {
    // Convert the dateString to a Date object
    const date = new Date(dateString);
  
    // Extract individual components of the date and time
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    // Define an array of month names
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Get the month name
    const monthName = monthNames[date.getMonth()];
  
    // Construct the readable date string
    const readableDate = `${monthName} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
  
    return readableDate;
  }
  