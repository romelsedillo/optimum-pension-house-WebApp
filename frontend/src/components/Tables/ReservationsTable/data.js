const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Guest", uid: "guest", sortable: true },
  { name: "Check-in Date", uid: "checkInDate", sortable: true },
  { name: "Check-out Date", uid: "checkOutDate", sortable: true },
  { name: "Total Amount", uid: "totalAmount", sortable: true },
  { name: "Room Details", uid: "room", sortable: true },
  { name: "Reference #", uid: "referenceNumber", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Check-in", uid: "check-in" },
  { name: "Check-out", uid: "check-out" },
  { name: "Pending", uid: "pending" },
  { name: "Confirmed", uid: "confirmed" },
];


export { columns, statusOptions };
