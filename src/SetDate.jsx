import React, { useState } from "react";
import { DateRangePicker } from "rsuite";

export default function SetDate() {
  const [date, setdate] = useState([]);
  const handleOnchangeDate = (value) => {
    setdate(value);
  };
  return (
    <div>
      <DateRangePicker
        onChange={handleOnchangeDate}
        value={date}
        format="YYYY-MM-DD"
      />
      <p>Start date: {date[0]}</p>
      <p>End date: {date[1]}</p>
    </div>
  );
}
