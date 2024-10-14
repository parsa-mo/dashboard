import React, { useEffect, useMemo, useState } from "react";
import { Main, Container, Divider } from "../Styles/Universal";
import { NavLink } from "react-router-dom";
import { Chamber, Grid, Environment, Electrolyser } from "../Pages/Pages";
export const DataContext = React.createContext();
const Home = () => {
  const [data, setData] = useState(null); // Store only the latest data point

  // Polling function to fetch the JSON data
  useEffect(() => {
    const fetchData = () => {
      fetch("/data.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((jsonData) => {
          setData(jsonData); // Replace old data with new data
        })
        .catch((error) => console.error("Error fetching JSON file:", error));
    };

    const intervalId = setInterval(fetchData, 1000);
    fetchData(); // Initial fetch

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Memoize the context value so it doesn't cause unnecessary re-renders
  const contextValue = useMemo(() => ({ data }), [data]);
  return (
    <DataContext.Provider value={contextValue}>
      <Main>
        <Divider />
        <Grid></Grid>
        <Divider />
        <Electrolyser></Electrolyser>
        <Divider />
        <Environment></Environment>
        <Divider />
        <Chamber></Chamber>
      </Main>
    </DataContext.Provider>
  );
};

export default Home;
