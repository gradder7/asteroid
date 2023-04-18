import React, { useEffect, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { fetchData } from "./utils/fetchData";

export default function SetDate() {
  const [date, setdate] = useState([]);
  const [showData, setShowData] = useState(false);
  const handleOnchangeDate = (value) => {
    setdate(value);
  };
  let dateStart =
    date && date.length ? date[0].toISOString().slice(0, 10) : null;
  let dateEnd = date && date.length ? date[1].toISOString().slice(0, 10) : null;

  useEffect(() => {
    const getData = async () => {
      let data = await fetchData(dateStart, dateEnd);
      console.log(data);
    };
    if (showData) {
      getData();
    }
  }, [dateStart, dateEnd]);

  const handleOk = () => {
    setShowData(true);
  };

  return (
    <>
      <DateRangePicker
        onChange={handleOnchangeDate}
        value={date}
        format="yyyy-MM-dd"
        appearance="default"
        onOk={handleOk}
      />
      <p>Start date: {dateStart}</p>
      <p>End date: {dateEnd}</p>
    </>
  );
}
