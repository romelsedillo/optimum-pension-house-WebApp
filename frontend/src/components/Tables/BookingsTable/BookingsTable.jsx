import { useEffect, useState, useMemo } from "react";

import { useAuth } from "../../../utils/AuthContext";
import ReservationCollection from "../../../utils/Collections/ReservationCollection";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

const BookingsTable = () => {
  const [data, setData] = useState([]);
  const { user } = useAuth();

  const userId = user.$id;

  const fetchData = async () => {
    try {
      const appWriteData = await ReservationCollection();
      setData(appWriteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const guestReservation = data.filter((item) => item.guestId === userId);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(guestReservation.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return guestReservation.slice(start, end);
  }, [page, guestReservation]);

  return (
    <div className=" h-screen flex flex-col items-center justify-start p-8 gap-6">
      <div>
        <h1 className="text-blue-500 text-lg">Name: {user.name}</h1>
        <h1 className="text-blue-500">
          Total Reservation: {guestReservation.length}
        </h1>
      </div>

      <div className="flex ">
        {guestReservation.length ? (
          <>
            <Table
              color="primary"
              isStriped
              removeWrapper
              aria-label=""
              bottomContent={
                <div className="mt-10 flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
              classNames={{
                wrapper: "min-h-[222px]",
              }}
            >
              <TableHeader>
                <TableColumn key="dateCreated" className="text-blue-500">
                  Date
                </TableColumn>
                <TableColumn key="type" className="text-blue-500">
                  Type
                </TableColumn>
                <TableColumn key="checkInDate" className="text-blue-500">
                  Check-in Date
                </TableColumn>
                <TableColumn key="checkOutDate" className="text-blue-500">
                  Check-out Date
                </TableColumn>
                <TableColumn key="room" className="text-blue-500">
                  Room
                </TableColumn>
                <TableColumn key="status" className="text-blue-500">
                  Status
                </TableColumn>
                <TableColumn key="totalAmount" className="text-blue-500">
                  Total Amount
                </TableColumn>
              </TableHeader>
              <TableBody items={items}>
                {(item) => (
                  <TableRow key={item.name}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        ) : (
          <h1>No reservations found</h1>
        )}
      </div>
    </div>
  );
};

export default BookingsTable;
