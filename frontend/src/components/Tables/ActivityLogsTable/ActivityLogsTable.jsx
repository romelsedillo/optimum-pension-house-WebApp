import { useState, useMemo, useEffect } from "react";
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
// import { users } from "./data";
import { logsCollection } from "../../../utils/Collections/logsCollection";

export default function ActivityLogsTable() {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const fetchData = async () => {
    try {
      const appWriteData = await logsCollection();
      setData(appWriteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table
      isStriped
      aria-label=""
      bottomContent={
        <div className="flex w-full justify-center">
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
        <TableColumn key="id">LOG ID</TableColumn>
        <TableColumn key="time">TIMESTAMP</TableColumn>
        <TableColumn key="user">USER</TableColumn>
        <TableColumn key="position">POSITION</TableColumn>
        <TableColumn key="actions">ACTIONS</TableColumn>
        <TableColumn key="details">DETAILS</TableColumn>
        <TableColumn key="status">STATUS</TableColumn>
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
  );
}
