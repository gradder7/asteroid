// export const handleAsteroidData = (
//   asteroidData,
//   setNumOfAsteorids,
//   setFastest,
//   setClosestAstorid,
//   setAvgSizeAstroid
// ) => {
//   if (Object.keys(asteroidData || {}).length !== 0) {
//     //array of dates
//     let labels = Object.keys(asteroidData);
//     let fastestAsteroid = [];
//     let closestAsteroid = [];
//     let avgSizeAsteroid = [];
//     let numAsteroids = [];

//     //array of all objects assocoated with dates
//     for (const [date, asteroids] of Object.entries(asteroidData)) {
//       console.log("perastorids", asteroids);

//       //object having the fasted data among the date
//       let fastestAsteroidForDate = asteroids.reduce(
//         (prev, curr) =>
//           parseFloat(
//             curr.close_approach_data[0].relative_velocity.kilometers_per_hour
//           ) >
//           parseFloat(
//             prev.close_approach_data[0].relative_velocity.kilometers_per_hour
//           )
//             ? curr
//             : prev,
//         asteroids[0]
//       );
//       console.log("fastest", fastestAsteroidForDate);

//       //get the fasted data of date
//       fastestAsteroid.push(
//         parseFloat(
//           fastestAsteroidForDate.close_approach_data[0].relative_velocity
//             .kilometers_per_hour
//         ).toFixed(2)
//       );

//       let closestAsteroidForDate = asteroids.reduce(
//         (prev, curr) =>
//           parseFloat(curr.close_approach_data[0].miss_distance.kilometers) <
//           parseFloat(prev.close_approach_data[0].miss_distance.kilometers)
//             ? curr
//             : prev,
//         asteroids[0]
//       );
//       closestAsteroid.push(
//         parseFloat(
//           closestAsteroidForDate.close_approach_data[0].miss_distance.kilometers
//         ).toFixed(2)
//       );

//       let avgSizeAsteroidForDate =
//         asteroids.reduce(
//           (prev, curr) =>
//             prev +
//             (parseFloat(
//               curr.estimated_diameter.kilometers.estimated_diameter_min
//             ) +
//               parseFloat(
//                 curr.estimated_diameter.kilometers.estimated_diameter_max
//               )) /
//               2,
//           0
//         ) / asteroids.length;
//       avgSizeAsteroid.push(avgSizeAsteroidForDate.toFixed(2));

//       numAsteroids.push(asteroids.length);
//     }

//     setNumOfAsteorids({
//       labels: labels,
//       datasets: [
//         {
//           label: "Number of Asteroids",
//           data: numAsteroids,
//           backgroundColor: "rgba(75, 192, 192, 0.2)",
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 1,
//         },
//       ],
//     });
//     setFastest({
//       labels: labels,
//       datasets: [
//         {
//           label: "Fastest Asteroid (km/h)",
//           data: fastestAsteroid,
//           backgroundColor: "rgba(255, 99,0, 0.2)",
//           borderColor: "rgba(255, 99, 0, 1)",
//           borderWidth: 1,
//         },
//       ],
//     });
//     setClosestAstorid({
//       labels: labels,
//       datasets: [
//         {
//           label: "Closest Asteroid (km)",
//           data: closestAsteroid,
//           backgroundColor: "rgba(54, 162, 235, 0.2)",
//           borderColor: "rgba(54, 162, 235, 1)",
//           borderWidth: 1,
//         },
//       ],
//     });
//     setAvgSizeAstroid({
//       labels: labels,
//       datasets: [
//         {
//           label: "Average Size of Asteroids (km)",
//           data: avgSizeAsteroid,
//           backgroundColor: "rgba(255, 206, 86, 0.2)",
//           borderColor: "rgba(255, 206, 86, 1)",
//           borderWidth: 1,
//         },
//       ],
//     });
//   }
// };

export const handleAsteroidData = (
  asteroidData,
  setNumOfAsteorids,
  setFastest,
  setClosestAstorid,
  setAvgSizeAstroid
) => {
  if (Object.keys(asteroidData || {}).length !== 0) {
    //array of dates
    let labels = Object.keys(asteroidData);
    let fastestAsteroid = [];
    let closestAsteroid = [];
    let fastestAsteroidName = [];
    let closestAsteroidName = [];
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
      fastestAsteroidName.push(fastestAsteroidForDate.name);

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
          closestAsteroidForDate.close_approach_data[0].miss_distance.kilometers
        ).toFixed(2)
      );
      closestAsteroidName.push(closestAsteroidForDate.name);

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
          backgroundColor: [
            "green",
            "red",
            "yellow",
            "blue",
            "purple",
            "aqua",
            "orange",
            "brown",
          ],
          borderColor: "rgba(75, 192, 192, 1)",
          // backgrond color:[c,c,ccc,];
          borderWidth: 1,
        },
      ],
    });

    setFastest({
      labels: labels,
      datasets: [
        {
          label: `Fastest Asteroid (km/h)`,
          data: fastestAsteroid,
          backgroundColor:  [
            "green",
            "red",
            "yellow",
            "blue",
            "purple",
            "aqua",
            "orange",
            "brown",
          ],
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
          backgroundColor: [
            "green",
            "red",
            "yellow",
            "blue",
            "purple",
            "aqua",
            "orange",
            "brown",
          ],
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
    setAvgSizeAstroid({
      labels: labels,
      datasets: [
        {
          label: "Average Size of Asteroid (km)",
          data: avgSizeAsteroid,
          backgroundColor: [
            "green",
            "red",
            "yellow",
            "blue",
            "purple",
            "aqua",
            "orange",
            "brown",
          ],
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    });
  }
};
