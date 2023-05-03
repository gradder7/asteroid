//handelling the data
export const handleAsteroidData = (
  asteroidData,
  setNumOfAsteorids,
  setFastest,
  setClosestAstorid,
  setAvgSizeAstroid
) => {
  // dates will be keys
  //objects of dates as key and data associated with the key
  // console.log(asteroidData);

  if (Object.keys(asteroidData || {}).length !== 0) {
    //array of dates
    let labels = Object.keys(asteroidData);
    let fastestAsteroid = [];
    let closestAsteroid = [];
    let fastestAsteroidName = [];
    let closestAsteroidName = [];
    let avgSizeAsteroid = [];
    let numAsteroids = [];

    //array of all objects associated with dates and there data 
    for (const [date, asteroids] of Object.entries(asteroidData)) {
      console.log("astroid", asteroids);

      //object having the fasted data among the date
      //parse float to convert the string data to the numberiv value for comparision 
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
        asteroids[0]//acumulator
      );

      //get the fasted data of date
      fastestAsteroid.push(
        parseFloat(
          fastestAsteroidForDate.close_approach_data[0].relative_velocity
            .kilometers_per_hour
        ).toFixed(2)
      );
      fastestAsteroidName.push(fastestAsteroidForDate.name);


      // closest asteroid
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


      // average size
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

    // number of asteroid
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
