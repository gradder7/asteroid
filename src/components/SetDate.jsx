import React, { useEffect, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { fetchData } from "../utils/fetchData";
import Chart from "chart.js/auto";

export default function SetDate() {
  const [date, setdate] = useState([]);
  const [showBtn, setShowBtn] = useState(true);
  // const [chartData, setChartData] = useState({});
  const [fastest, setFastest] = useState({});
  const [numOfAsteroids, setNumOfAsteorids] = useState({});
  const [closestAstroid, setClosestAstorid] = useState({});
  const [avgSizeAstroid, setAvgSizeAstroid] = useState({});
  const [charts, setCharts] = useState([]);

  const handleOnchangeDate = (value) => {
    setShowBtn(true);
    setdate(value);
  };

  const getDate = async () => {
    let dateStart =
      date && date.length ? date[0].toISOString().slice(0, 10) : null;
    let dateEnd =
      date && date.length ? date[1].toISOString().slice(0, 10) : null;
    let data = await fetchData(dateStart, dateEnd);

    return data.near_earth_objects;
  };

  const checkChartAlreadyExistAndDestroy = () => {
    if (charts.length) {
      charts.forEach((chart) => {
        chart.destroy();
      });
      setCharts([]);
    }
  };

  const handleAsteroidData = (asteroidData) => {
    if (Object.keys(asteroidData || {}).length !== 0) {
      //array of dates
      let labels = Object.keys(asteroidData);
      let fastestAsteroid = [];
      let closestAsteroid = [];
      let avgSizeAsteroid = [];
      let numAsteroids = [];

      //array of all objects assocoated with dates
      for (const [date, asteroids] of Object.entries(asteroidData)) {
        console.log("perastorids", asteroids);

        //object having the fasted data among the date
        let fastestAsteroidForDate = asteroids.reduce(
          (prev, curr) =>
            parseFloat(
              curr.close_approach_data[0].relative_velocity.kilometers_per_hour
            ) >
            parseFloat(
              prev.close_approach_data[0].relative_velocity.kilometers_per_hour
            )
              ? curr
              : prev,
          asteroids[0]
        );
        console.log("fastest", fastestAsteroidForDate);

        //get the fasted data of date
        fastestAsteroid.push(
          parseFloat(
            fastestAsteroidForDate.close_approach_data[0].relative_velocity
              .kilometers_per_hour
          ).toFixed(2)
        );

        let closestAsteroidForDate = asteroids.reduce(
          (prev, curr) =>
            parseFloat(curr.close_approach_data[0].miss_distance.kilometers) <
            parseFloat(prev.close_approach_data[0].miss_distance.kilometers)
              ? curr
              : prev,
          asteroids[0]
        );
        closestAsteroid.push(
          parseFloat(
            closestAsteroidForDate.close_approach_data[0].miss_distance
              .kilometers
          ).toFixed(2)
        );

        let avgSizeAsteroidForDate =
          asteroids.reduce(
            (prev, curr) =>
              prev +
              (parseFloat(
                curr.estimated_diameter.kilometers.estimated_diameter_min
              ) +
                parseFloat(
                  curr.estimated_diameter.kilometers.estimated_diameter_max
                )) /
                2,
            0
          ) / asteroids.length;
        avgSizeAsteroid.push(avgSizeAsteroidForDate.toFixed(2));

        numAsteroids.push(asteroids.length);
      }

      setNumOfAsteorids({
        labels: labels,
        datasets: [
          {
            label: "Number of Asteroids",
            data: numAsteroids,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
      setFastest({
        labels: labels,
        datasets: [
          {
            label: "Fastest Asteroid (km/h)",
            data: fastestAsteroid,
            backgroundColor: "rgba(255, 99,0, 0.2)",
            borderColor: "rgba(255, 99, 0, 1)",
            borderWidth: 1,
          },
        ],
      });
      setClosestAstorid({
        labels: labels,
        datasets: [
          {
            label: "Closest Asteroid (km)",
            data: closestAsteroid,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      });
      setAvgSizeAstroid({
        labels: labels,
        datasets: [
          {
            label: "Average Size of Asteroids (km)",
            data: avgSizeAsteroid,
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    checkChartAlreadyExistAndDestroy();
    getDate()
      .then((data) => {
        handleAsteroidData(data);
        setShowBtn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    <div className="container">
      <form onSubmit={handleOnSubmit}>
        <DateRangePicker
          style={{ width: 400 }}
          value={date}
          onChange={handleOnchangeDate}
        />
        <button className="btn btn-primary" type="submit" disabled={!showBtn}>
          Submit
        </button>
      </form>
      <div className="chart-container">
        <canvas id="chart"></canvas>
      </div>
      <div className="chart-container">
        <canvas id="chart1"></canvas>
      </div>
      <div className="chart-container">
        <canvas id="chart2"></canvas>
      </div>
      <div className="chart-container">
        <canvas id="chart3"></canvas>
      </div>
    </div>
  );
}
