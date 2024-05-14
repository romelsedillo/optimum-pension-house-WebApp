import React, { useState, useMemo } from "react";
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

import {useAuth} from "../../../utils/AuthContext"
import {capitalize} from "../../../utils/capitalize"

export default function ReportsTable({ data, selectedDateRange }) {

  const { role, user, } = useAuth();
  const [page, setPage] = useState(1);
  const rowsPerPage = 15;

  // Filter data based on selected date range
  const filteredData = useMemo(() => {
    if (!selectedDateRange) return data; // If no date range is selected, return all data
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate >= selectedDateRange.start && itemDate <= selectedDateRange.end
      );
    });
  }, [data, selectedDateRange]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
  }, [page, filteredData]);

  const totalProfit = filteredData.reduce(
    (acc, item) => acc + item.totalAmount,
    0
  );

  return (
    <>
      <Table
        isStriped
        aria-label="table"
        bottomContent={
          <div className="flex flex-col w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
            <div>
              <div className="w-full flex items-center justify-end px-32 mt-4">
                <p style={{ textAlign: "right" }}>
                  Total Profit:{" "}
                  <span style={{ textDecoration: "underline" }}>
                    ₱ {totalProfit}
                  </span>
                </p>
              </div>
              <div className="w-full flex items-center justify-end px-28">
                <div>
                  <p style={{ textAlign: "right" }}>
                    Generated By:{" "}
                    <span style={{ textDecoration: "underline" }}>{capitalize(role)}: {capitalize(user.name)}</span>
                  </p>
                  <p style={{ textAlign: "right" }}>
                    Approved By:{" "}
                    <span style={{ textDecoration: "underline" }}>Manager</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="date">DATE</TableColumn>
          <TableColumn key="quantity">QUANTITY</TableColumn>
          <TableColumn key="roomType">ROOM TYPE</TableColumn>
          <TableColumn key="amount">AMOUNT</TableColumn>
          <TableColumn key="totalAmount">TOTAL AMOUNT</TableColumn>
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
  );
}
