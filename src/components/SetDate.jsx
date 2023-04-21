import React, { useEffect, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { fetchData } from "../utils/fetchData";
import Chart from "chart.js/auto";
import { handleAsteroidData } from "../utils/handleAstroidData";
import { toast } from "react-toastify";
import Loading from "./Loading";
import Typewriter from "typewriter-effect";

export default function SetDate() {
  const [date, setdate] = useState([]);
  const [showBtn, setShowBtn] = useState(true);
  const [fastest, setFastest] = useState({});
  const [loading, setLoading] = useState(false);
  const [numOfAsteroids, setNumOfAsteorids] = useState({});
  const [closestAstroid, setClosestAstorid] = useState({});
  const [avgSizeAstroid, setAvgSizeAstroid] = useState({});
  const [charts, setCharts] = useState([]);
  const handleOnchangeDate = (value) => {
    setShowBtn(true);
    setdate(value);
  };

  const getDate = async () => {
    if (!date || date.length !== 2) {
      // Show error if date is not an array with two values
      toast.error("Please select a date first to continue!");
      setLoading(false);
      throw new Error(
        "Invalid date range. Please provide a start and end date."
      );
    }
    const start = new Date(date[0]);
    const end = new Date(date[1]);
    const dayDifference = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Get the difference in days
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
    return data.near_earth_objects;
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
    getDate()
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
        options: {
          animations: {
            tension: {
              duration: 5000,
              easing: "linear",
              from: 1,
              to: 0,
              loop: true,
            },
          },
          tooltips: {
            enabled: false,
          },
        },
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
      setCharts([chart_1, chart_2, chart_3, chart_4]);
    }
  }, [numOfAsteroids]);

  return (
    <div className="m-auto mt-5" style={{ width: "600px" }}>
      <div className="container">
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
        {loading ? (
          <Loading />
        ) : (
          <>
            <h1 className="text-center mt-4">Asteroid data</h1>
            <h2 className="text-center">
              <Typewriter
                options={{
                  strings: ["Closest", "Fastest", "Asteroid", "NASA"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
            <div className="chart-container mb-5">
              <canvas id="chart"></canvas>
            </div>
            <div className="chart-container mb-5">
              <canvas id="chart1"></canvas>
            </div>
            <div className="chart-container mb-5">
              <canvas id="chart2"></canvas>
            </div>
            <div className="chart-container mb-5">
              <canvas id="chart3"></canvas>
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
}
