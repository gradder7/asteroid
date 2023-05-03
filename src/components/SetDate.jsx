import React, { useEffect, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Chart from "chart.js/auto";
import { handleAsteroidData } from "../utils/handleAstroidData";
import Loading from "./Loading";
import Typewriter from "typewriter-effect";
import Canvas from "./Canvas";
import { getDate } from "../utils/getDate";

export default function SetDate() {
  const [date, setdate] = useState([]);
  const [showBtn, setShowBtn] = useState(true);
  const [fastest, setFastest] = useState({});
  const [loading, setLoading] = useState(false);
  const [numOfAsteroids, setNumOfAsteorids] = useState({});
  const [closestAstroid, setClosestAstorid] = useState({});
  const [avgSizeAstroid, setAvgSizeAstroid] = useState({});
  const [charts, setCharts] = useState([]);

  // handle the data
  const handleOnchangeDate = (value) => {
    setShowBtn(true);
    setdate(value);
  };

  // destroy the canvas id
  const checkChartAlreadyExistAndDestroy = () => {
    if (charts.length) {
      charts.forEach((chart) => {
        chart.destroy();
      });
      setCharts([]);
    }
  };

  //handle submit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    checkChartAlreadyExistAndDestroy();
    getDate(date, setLoading)
      .then((data) => {
        handleAsteroidData(
          data,
          setNumOfAsteorids,
          setFastest,
          setClosestAstorid,
          setAvgSizeAstroid
        );
        setShowBtn(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //chats objects
  useEffect(() => {
    if (Object.keys(numOfAsteroids).length !== 0) {
      const ctx = document.getElementById("chart");
      let chart_1 = new Chart(ctx, {
        type: "bar",
        data: numOfAsteroids,
      });
      const ctx1 = document.getElementById("chart1");
      let chart_2 = new Chart(ctx1, {
        type: "line",
        data: fastest,
        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: "linear",
              from: 1,
              to: 0,
              loop: true,
            },
          },
        },
      });
      const ctx2 = document.getElementById("chart2");
      let chart_3 = new Chart(ctx2, {
        type: "bar",
        data: closestAstroid,
      });
      const ctx3 = document.getElementById("chart3");
      let chart_4 = new Chart(ctx3, {
        type: "bar",
        data: avgSizeAstroid,
      });
      //to destroy the canvas id
      setCharts([chart_1, chart_2, chart_3, chart_4]);
    }
  }, [numOfAsteroids]);

  return (
    <div className="m-auto mt-5" style={{ width: "600px" }}>
      <div className="container">
        <>
          <p className="text-center mb-5">
            <em>*Please select a date range to fetch the data</em>
          </p>
          <form onSubmit={handleOnSubmit}>
            <DateRangePicker
              style={{ width: 400 }}
              value={date}
              onChange={handleOnchangeDate}
            />
            <button
              className="btn btn-primary mx-5"
              type="submit"
              disabled={!showBtn}
            >
              Submit
            </button>
          </form>
          <h1 className="text-center mt-4">Asteroid data</h1>
          <h2 className="text-center mb-5">
            <Typewriter
              options={{
                strings: ["Closest", "Fastest", "Asteroid", "NASA"],
                autoStart: true,
                loop: true,
              }}
            />
          </h2>
        </>
        {loading ? <Loading /> : <Canvas />}
      </div>
    </div>
  );
}
