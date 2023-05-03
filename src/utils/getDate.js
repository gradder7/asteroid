import { toast } from "react-toastify";
import { fetchData } from "./fetchData";

// get the date and data of that date-range
export const getDate = async (date, setLoading) => {
  if (!date || date.length !== 2) {
    // Show error if date is not an array with two values
    toast.error("Please select a date first to continue!");
    setLoading(false);
    throw new Error("Invalid date range. Please provide a start and end date.");
  }
  const start = new Date(date[0]);
  console.log("start", start);

  const end = new Date(date[1]);
  // Get the difference in days
  const dayDifference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  if (dayDifference >= 8) {
    setLoading(false);
    toast.error("Date range must be 7 days or less.");
    // Show error if the difference in days is greater than or equal to 8
    throw new Error("Date range must be 7 days or less.");
  }
  // Format dates for API call
  const dateStart = start.toISOString().slice(0, 10);

  const dateEnd = end.toISOString().slice(0, 10);
  // Make API call
  const data = await fetchData(dateStart, dateEnd);
  // return relevant data
  return data.near_earth_objects;
};
