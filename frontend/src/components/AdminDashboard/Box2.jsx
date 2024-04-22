import React, { useState, useEffect } from "react";
import { fetchDataFromAppwrite } from "./datafetch"; // Adjust the path as per your file structure

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the fetchDataFromAppwrite function to fetch data from Appwrite
        const appwriteData = await fetchDataFromAppwrite();
        setData(appwriteData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  return (
    <div>
      <h1>Appwrite Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.firstName} {item.lastName} - {item.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
