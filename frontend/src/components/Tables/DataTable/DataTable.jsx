import React from "react";
import oph from "../../../assets/images/oph.jpg";

import { useAuth } from "../../../utils/AuthContext";
import { capitalize } from "../../../utils/capitalize";

// Utility function to format numbers with a peso sign and commas
function formatCurrency(amount) {
  return `₱ ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

const DataTable = ({ data, selectedDateRange }) => {
  const { role, user } = useAuth();

  const startDate = selectedDateRange?.start
    ? new Date(selectedDateRange.start)
    : null;
  const endDate = selectedDateRange?.end
    ? new Date(selectedDateRange.end)
    : null;

  // Filter the data based on the selected date range if it's defined
  const filteredData = selectedDateRange
    ? data.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      })
    : data;

  const totalProfit = filteredData.reduce(
    (acc, item) => acc + parseFloat(item.totalAmount),
    0
  );

  return (
    <div
      id="report"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "15px",
        color: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={oph}
          alt="Optimum Pension House"
          style={{ width: "100px", height: "auto" }}
        />
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            lineHeight: "2rem",
          }}
          className=" text-2xl"
        >
          Optimum Pension House
        </h1>
      </div>

      <div>
        {/* Display the date range if it's defined */}
        {startDate && endDate && (
          <p>
            from {startDate.toLocaleDateString()} to{" "}
            {endDate.toLocaleDateString()}
          </p>
        )}
      </div>
      {/* Display the table */}
      <table
        style={{
          width: "90%",
          borderCollapse: "collapse",
          color: "#000",
        }}
      >
        {/* Table headers */}
        <thead>
          <tr
            style={{
              textAlign: " center",
              border: "1px solid black",
            }}
          >
            <th
              style={{
                borderRight: "1px solid black", // Updated border color
                borderLeft: "1px solid black", // Updated border color

                padding: "6px 6px",
              }}
            >
              Date
            </th>
            <th
              style={{
                borderRight: "1px solid black", // Updated border color
              }}
            >
              Total Days
            </th>
            <th
              style={{
                borderRight: "1px solid black", // Updated border color
              }}
            >
              Room Type
            </th>
            <th
              style={{
                borderRight: "1px solid black", // Updated border color
              }}
            >
              Amount
            </th>
            <th
              style={{
                borderRight: "1px solid black", // Updated border color
              }}
            >
              Total Amount
            </th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {/* Map over filtered data and render table rows */}
          {filteredData.map((item, index) => (
            <tr
              key={index}
              style={{
                textAlign: " center",
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
              }}
            >
              <td
                style={{
                  borderRight: "1px solid black", // Updated border color
                  borderLeft: "1px solid black", // Updated border color
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {item.date}
              </td>
              <td
                style={{
                  borderRight: "1px solid black", // Updated border color
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {item.days}
              </td>
              <td
                style={{
                  borderRight: "1px solid black", // Updated border color
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {item.roomType}
              </td>
              <td
                style={{
                  borderRight: "1px solid black", // Updated border color
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {formatCurrency(parseFloat(item.roomRate))}
              </td>
              <td
                style={{
                  borderRight: "1px solid black", // Updated border color
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {formatCurrency(parseFloat(item.totalAmount))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Display total profit and other information */}
      <div className="w-full flex items-center justify-end px-32 mt-4">
        <p style={{ textAlign: "right" }}>
          Total Profit:{" "}
          <span style={{ textDecoration: "underline" }}>
            {formatCurrency(totalProfit)}
          </span>
        </p>
      </div>
      <div className="w-full flex items-center justify-end px-28">
        <div>
          <p style={{ textAlign: "right" }}>
            Generated By:{" "}
            <span style={{ textDecoration: "underline" }}>
              {capitalize(user.name)}
            </span>
          </p>
          <p style={{ textAlign: "right" }}>
            Approved By:{" "}
            <span style={{ textDecoration: "underline" }}>
              {" "}
              {capitalize(role)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
