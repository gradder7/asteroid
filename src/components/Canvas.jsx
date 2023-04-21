import React from "react";

function Canvas() {
  return (
    <>
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
  );
}

export default Canvas;
