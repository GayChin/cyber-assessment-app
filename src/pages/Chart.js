import React, {useLayoutEffect} from "react";
import DoughnutChart from "../components/Chart/DoughnutChart";
import "./Dashboard.scss";

const Chart = ({chartData}) => {
  useLayoutEffect(() => {
    const element = document.getElementById("charts");
    element.addEventListener("wheel", (event) => {
      event.preventDefault();
      element.scrollBy({
        left: event.deltaY < 0 ? -50 : 50,
      });
    });
  }, []);

  return (
    <div id="charts">
      {chartData.map((data) => {
        return (
          <DoughnutChart
            title={data.chart_title}
            dataArr={[data.num_checkpoint_hits, data.num_checkpoint_fails]}
          ></DoughnutChart>
        );
      })}
      {/* <DoughnutChart title={"Email Phishing"} dataArr={[20, 10]} />
      <DoughnutChart title={"SQL Injections"} dataArr={[13, 20]} />
      <DoughnutChart title={"DDOS"} dataArr={[15, 9]} />
      <DoughnutChart title={"Email Phishing"} dataArr={[6, 15]} />
      <DoughnutChart title={"SQL Injections"} dataArr={[3, 5]} />
      <DoughnutChart title={"DDOS"} dataArr={[3, 10]} /> */}
    </div>
  );
};

export default Chart;
