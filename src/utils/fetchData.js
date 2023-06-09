//fetch the data of the particual date-range
import { toast } from "react-toastify";
// let key = "lWqWFrjmFIiboAH2VLcySyb3yuu2mAFm0ahgfqC0";
export const fetchData = async (startDate, endDate) => {
  toast.info('Fetching data please wait...')
  let response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.REACT_APP_API_KEY}`
  );
  
  let data = await response.json();
  return data;
};
