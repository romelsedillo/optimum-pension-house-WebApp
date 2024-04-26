import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Modal,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { capitalize } from "./utils";
// import { columns, statusOptions } from "./data";
import AddReservationModal from "../../Modal/AddReservationModal/AddReservationModal";
import UpdateReservationModal from "../../Modal/UpdateReservationModal/UpdateReservationModal";
import { fetchDataFromAppwrite } from "./datafetch";
import { toast } from "react-hot-toast";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Date Created", uid: "dateCreated", sortable: true },
  { name: "Type", uid: "type", sortable: true },
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

const statusColorMap = {
  "check-in": "success",
  "check-out": "warning",
  pending: "danger",
  confirmed: "secondary",
};

const INITIAL_VISIBLE_COLUMNS = [
  "dateCreated",
  "type",
  "guest",
  "checkInDate",
  "checkOutDate",
  "room",
  "totalAmount",
  "status",
  "referenceNumber",
  "actions",
];

export default function ReservationsTable() {
  const [users, setData] = useState([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "dateCreated",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onOpenChange: onAddModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onOpenChange: onUpdateModalOpenChange,
  } = useDisclosure();
  const [reservationId, setReservationId] = useState("");
  const [roomId, setRoomId] = useState("");

  const fetchData = async () => {
    try {
      const appWriteData = await fetchDataFromAppwrite();
      setData(appWriteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleAddSuccess = async () => {
    try {
      await fetchData(); // Fetch updated data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdateSuccess = async () => {
    try {
      await fetchData(); // Fetch updated data
    } catch (error) {
      console.error("Error updating reservation:", error);
      toast.error(`Error updating reservation: ${error.message}`);
    }
  };

  const getReservationId = (reservationId, roomId) => {
    setReservationId(reservationId);
    setRoomId(roomId);
  };

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.guest.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }
    return filteredUsers;
  }, [users, filterValue, statusFilter, hasSearchFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    const date = new Date(cellValue);
    const getMonthName = (monthIndex) => {
      const months = [
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
      return months[monthIndex];
    };
    const getDayOfWeek = (dayIndex) => {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return daysOfWeek[dayIndex];
    };
    const year = date.getFullYear();
    const month = getMonthName(date.getMonth());
    const dayOfWeek = getDayOfWeek(date.getDay());
    const day = date.getDate();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    const readableDate = `${dayOfWeek}, ${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
    switch (columnKey) {
      case "checkInDate":
        return <>{readableDate}</>;
      case "checkOutDate":
        return <>{readableDate}</>;
      case "totalAmount":
        return <>₱ {cellValue}</>;
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user?.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );

      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => alert(user.roomId)}>
                  View
                </DropdownItem>
                <DropdownItem
                  onPress={onUpdateModalOpen}
                  onClick={() => getReservationId(user.id, user.roomId)}
                >
                  Update
                </DropdownItem>
                <DropdownItem onClick={() => alert("delete clicked")}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by Guest name..."
            size=""
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className=" text-background"
              endContent={<PlusIcon />}
              size="sm"
              color="primary"
              onPress={onAddModalOpen}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );
  return (
    <>
      <Table
        className="bg-white"
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No data found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        isOpen={isAddModalOpen}
        onOpenChange={onAddModalOpenChange}
        placement="top-center"
        size="lg"
        className=""
      >
        <AddReservationModal onAddSuccess={handleAddSuccess} />
      </Modal>
      <Modal
        isOpen={isUpdateModalOpen}
        onOpenChange={onUpdateModalOpenChange}
        placement="top-center"
        size="sm"
        className="p-4"
      >
        <UpdateReservationModal
          onUpdateSuccess={handleUpdateSuccess}
          reservationId={reservationId}
          roomId={roomId}
        />
      </Modal>
    </>
  );
}
