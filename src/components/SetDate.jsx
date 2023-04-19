import React, { useEffect, useState } from "react";
import { DateRangePicker, SelectPicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { fetchData } from "../utils/fetchData";
import Chart from "chart.js/auto";

export default function SetDate() {
  const [date, setdate] = useState([]);
  const [showData, setShowData] = useState(false);
  const [asteroidData, setAsteroidData] = useState({});
  const [chartData, setChartData] = useState({});
  const [selectedLabel, setSelectedLabel] = useState("fastestAsteroid");

  const handleOnchangeDate = (value) => {
    setdate(value);
  };
  let dateStart =
    date && date.length ? date[0].toISOString().slice(0, 10) : null;
  let dateEnd = date && date.length ? date[1].toISOString().slice(0, 10) : null;

  useEffect(() => {
    const getData = async () => {
      let data = await fetchData(dateStart, dateEnd);
      setAsteroidData(data.near_earth_objects);
    };
    if (showData) {
      getData();
    }
  }, [dateStart, dateEnd, showData]);

  useEffect(() => {
    if (Object.keys(asteroidData).length !== 0) {
      let labels = Object.keys(asteroidData);
      let fastestAsteroid = [];
      let closestAsteroid = [];
      let avgSizeAsteroid = [];
      let numAsteroids = [];
      for (const date of labels) {
        const asteroids = asteroidData[date];
        let fastestAsteroidForDate = asteroids[0];
        let fastestAsteroidVelocity = parseFloat(
          asteroids[0].close_approach_data[0].relative_velocity
            .kilometers_per_second
        );
        for (const asteroid of asteroids) {
          const asteroidVelocity = parseFloat(
            asteroid.close_approach_data[0].relative_velocity
              .kilometers_per_second
          );
          if (asteroidVelocity > fastestAsteroidVelocity) {
            fastestAsteroidVelocity = asteroidVelocity;
            fastestAsteroidForDate = asteroid;
          }
        }
        fastestAsteroid.push(
          parseFloat(
            fastestAsteroidForDate.close_approach_data[0].relative_velocity
              .kilometers_per_hour
          ).toFixed(2)
        );

        let closestAsteroidForDate = asteroids[0];
        let closestAsteroidDistance = parseFloat(
          asteroids[0].close_approach_data[0].miss_distance.kilometers
        );
        for (const asteroid of asteroids) {
          const asteroidDistance = parseFloat(
            asteroid.close_approach_data[0].miss_distance.kilometers
          );
          if (asteroidDistance < closestAsteroidDistance) {
            closestAsteroidDistance = asteroidDistance;
            closestAsteroidForDate = asteroid;
          }
        }
        closestAsteroid.push(closestAsteroidDistance.toFixed(2));

        let avgSizeAsteroidForDate = 0;
        for (const asteroid of asteroids) {
          avgSizeAsteroidForDate +=
            (parseFloat(
              asteroid.estimated_diameter.kilometers.estimated_dd_diameter_min
            ) +
              parseFloat(
                asteroid.estimated_diameter.kilometers.estimated_diameter_max
              )) /
            2;
        }
        avgSizeAsteroid.push(
          (avgSizeAsteroidForDate / asteroids.length).toFixed(2)
        );
        numAsteroids.push(asteroids.length);
      }

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Fastest Asteroid (km/h)",
            data: fastestAsteroid,
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Closest Asteroid (km)",
            data: closestAsteroid,
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Average Size of Asteroids (km)",
            data: avgSizeAsteroid,
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
          },
          {
            label: "Number of Asteroids",
            data: numAsteroids,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };
      setChartData(data);
    }
  }, [asteroidData]);

  const handleOnchangeLabel = (value) => {
    setSelectedLabel(value);
    destroyCanvas();
  };
  const destroyCanvas = () => {
    const canvas = document.getElementById("myChart");
    if (canvas) {
      canvas.parentNode.removeChild(canvas);
    }
  };

  useEffect(() => {
    if (Object.keys(chartData).length !== 0) {
      const ctx = document.getElementById("myChart");
      new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    }
  }, [chartData, selectedLabel]);

  return (
    <div>
      <h2>Choose a date range to show asteroid data</h2>
      <DateRangePicker onChange={handleOnchangeDate} />
      <br />
      <br />
      <button onClick={() => setShowData(true)}>Show Data</button>
      <br />
      <br />
      {Object.keys(chartData).length !== 0 && (
        <>
          <SelectPicker
            data={[
              { label: "Fastest Asteroid (km/h)", value: "fastestAsteroid" },
              { label: "Closest Asteroid (km)", value: "closestAsteroid" },
              {
                label: "Average Size of Asteroids (km)",
                value: "avgSizeAsteroid",
              },
              { label: "Number of Asteroids", value: "numAsteroids" },
            ]}
            searchable={false}
            cleanable={false}
            onChange={handleOnchangeLabel}
            defaultValue="fastestAsteroid"
          />
          <canvas id="myChart" width="400" height="400"></canvas>
        </>
      )}
    </div>
  );
}
