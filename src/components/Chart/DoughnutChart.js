import React from "react";
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import styles from "./Chart.module.scss";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// const plugins = [
//   {
//     afterDraw: function (chart) {
//       var width = chart.width,
//         height = chart.height,
//         ctx = chart.ctx;
//       ctx.restore();
//       console.log(ctx);
//       var fontSize = (height / 300).toFixed(2);
//       ctx.font = fontSize + "em arial";
//       ctx.textBaseline = "top";
//       var text = "Email Phishing",
//         textX = Math.round((width - ctx.measureText(text).width) / 2),
//         textY = height / 2;
//       ctx.fillText(text, textX, textY);
//       ctx.save();
//     },
//   },
// ];

const option = {
  responsive: true,
  maintainAspectRatio: true,

  plugins: {
    legend: {
      position: ["bottom", "left"],
    },
    datalabels: {
      color: "black",
      font: {
        size: 13,
        family: "Tahoma",
      },
      formatter: (value, ctx) => {
        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        dataArr.map((data) => {
          return (sum += data);
        });
        let percentage = ((value * 100) / sum).toFixed(2) + "%";
        return percentage;
      },
    },
  },
};

const DoughnutChart = ({title, dataArr}) => {
  const data = {
    labels: ["Received", "Gap"],
    datasets: [
      {
        data: [dataArr[0], dataArr[1]],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className={styles["doughnut-card-container"]}>
        <div className={styles["doughnut-chart-title"]}>{title}</div>
        <div className={styles["doughnut-chart-content"]}>
          <div className={styles["legend"]}>
            <div className={styles["legend-item"]}>
              <div className={styles["blue"]} />
              <div className={styles["legend-text"]}>Received</div>
            </div>
            <div className={styles["legend-item"]}>
              <div className={styles["red"]} />
              <div className={styles["legend-text"]}>Gap</div>
            </div>
          </div>
          <div className={styles["doughnut-chart-container"]}>
            <Doughnut data={data} options={option} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoughnutChart;
