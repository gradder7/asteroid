import { toast } from "react-toastify";
let key = "lWqWFrjmFIiboAH2VLcySyb3yuu2mAFm0ahgfqC0";
export const fetchData = async (startDate, endDate) => {
  toast.info('Fetching data please wait...')
  let response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${key}`
  );
  let data = await response.json();
  return data;
};
