import React, {useEffect, useState, useLayoutEffect} from "react";
import {ProgressCard} from "../components/DashboardComponents/ProgressCard";
import {ImprovementCard} from "../components/DashboardComponents/ImprovementCard";
import styles from "./Dashboard.module.scss";
import "./Dashboard.scss";
import GenericBanner from "../components/GenericBanner/GenericBanner";
import Footer from "../components/Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {setTabSelected} from "../redux/dashboardData/dashboardDataSlice";
import {Container, Spinner} from "react-bootstrap";
import SmallCard from "../components/SmallCard/SmallCard";
import {NoResultError} from "../components/DashboardComponents/NoResultError";
import {getSimulationResult} from "../services/api/simulationResult";
import DoughnutChart from "../components/Chart/DoughnutChart";
import Chart from "./Chart";
const dummyRecommendedModules = [
  {
    id: 0,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    id: 1,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    id: 2,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    id: 3,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    id: 4,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
];

const dummyCompletedModules = [
  {
    id: 0,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    id: 1,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    id: 2,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
];

const dummyInProgressModules = [
  {
    id: 0,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    id: 1,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    id: 2,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    id: 3,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    id: 4,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
  {
    id: 5,
    title: "Phishing",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  },
];

const RECOMMENDED_EMPTY_SPACE = dummyRecommendedModules.length % 3;
const COMPLETED_EMPTY_SPACE = dummyCompletedModules.length % 3;
const INPROGRESS_EMPTY_SPACE = dummyInProgressModules.length % 3;
const RECOMMENDED_EMPTY_ARR = [];
const COMPLETED_EMPTY_ARR = [];
const INPROGRESS_EMPTY_ARR = [];

for (let i = 0; i <= RECOMMENDED_EMPTY_SPACE; i++) {
  RECOMMENDED_EMPTY_ARR.push(".");
}
for (let i = 0; i <= COMPLETED_EMPTY_SPACE; i++) {
  COMPLETED_EMPTY_ARR.push(".");
}
for (let i = 0; i <= INPROGRESS_EMPTY_SPACE; i++) {
  INPROGRESS_EMPTY_ARR.push(".");
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [improvementResult, setImprovementResult] = useState([]);
  const [activitiesCompleted, setActivitiesCompleted] = useState(null);
  const [modulesCompleted, setModulesCompleted] = useState(null);
  const [resilienceLevel, setResilienceLevel] = useState(null);
  const [chartData, setChartData] = useState(null);

  const simulationId = 1;
  const userProfile = useSelector((state) => state.user.userProfile);

  const recommendationArr = [];
  const resilienceLvlArr = [];
  const chartArr = [];

  async function getAllResult() {
    const simulationResult = await Promise.all([
      getSimulationResult(simulationId),
    ]);
    console.log(simulationResult);
    if (simulationResult) {
      setActivitiesCompleted(simulationResult[0].num_activities_completed);
      setModulesCompleted(simulationResult[0].num_modules_completed);

      for (const key of Object.keys(simulationResult[0].donut_chart_data)) {
        const tempChartData = {};
        tempChartData["chart_title"] = key;
        tempChartData["num_checkpoint_hits"] =
          simulationResult[0].donut_chart_data[key].num_checkpoint_hits;
        tempChartData["num_checkpoint_fails"] =
          simulationResult[0].donut_chart_data[key].total_checkpoints -
          tempChartData["num_checkpoint_hits"];
        chartArr.push(tempChartData);
      }

      setChartData(chartArr);

      if (simulationResult[0].modules) {
        //loop through module
        for (let i = 0; i < simulationResult[0].modules.length; i++) {
          let currentResLvl = simulationResult[0].modules[i].resilience_level;
          resilienceLvlArr.push(currentResLvl);
          //loop through simulation
          if (simulationResult[0].modules[i].simulation.length !== 0) {
            for (
              let j = 0;
              j < simulationResult[0].modules[i].simulation.length;
              j++
            ) {
              //loop through outcome
              if (
                simulationResult[0].modules[i].simulation[j].outcome.length !==
                0
              ) {
                for (
                  let k = 0;
                  k <
                  simulationResult[0].modules[i].simulation[j].outcome.length;
                  k++
                ) {
                  let currentOutcome =
                    simulationResult[0].modules[i].simulation[j].outcome[k];
                  recommendationArr.push(currentOutcome);
                }
              }
            }
          }
        }
      }
      setImprovementResult(recommendationArr);
      setResilienceLevel(resilienceLvlArr);
      setIsLoading(false);
    }
  }

  // useLayoutEffect(() => {
  //   const element = document.getElementById("charts");
  //   element.addEventListener("wheel", (event) => {
  //     event.preventDefault();
  //     element.scrollBy({
  //       left: event.deltaY < 0 ? -30 : 30,
  //     });
  //   });
  // }, []);

  useEffect(() => {
    if (!userProfile.is_first_time) {
      getAllResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabSelected = useSelector((state) => state.dashboardData.tabSelected);

  return (
    <div>
      <br />
      <br />
      {userProfile.is_first_time ? (
        <NoResultError
          errMessage={
            "Please complete the first assessment to unlock your dashboard"
          }
        />
      ) : isLoading ? (
        <div align="center" className="p-5 m-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>{" "}
          </Spinner>
        </div>
      ) : (
        <>
          <GenericBanner title="DASHBOARD" searchBar={false} />
          <Container className={styles["bootstrap-container"]}>
            <div className={styles["dashboard-container"]}>
              <div className={styles["dashboard-center"]}>
                <h1 className={styles["sub-titles"]}>My Progress</h1>
                <div className={styles["progress-cards-row"]}>
                  <ProgressCard
                    text="Total Resilience level"
                    number={resilienceLevel.reduce(
                      (sum, lvl) => (sum = sum + lvl),
                      0
                    )}
                  />
                  <ProgressCard
                    text="Modules completed"
                    number={modulesCompleted}
                  />
                  <ProgressCard
                    text="Activities completed"
                    number={activitiesCompleted}
                  />
                </div>
                <hr className={styles["dashboard-hr"]} />
                <h1 className={styles["sub-titles"]}>Charts</h1>
                <Chart chartData={chartData} />
                <br />
                <h1 className={styles["sub-titles"]}>Improvements</h1>
                <div className={styles["improvement-cards-row"]}>
                  {/* {dummyRecommendedModules.map((module) => {
                    return (
                      <ImprovementCard
                        id={module.id}
                        title={module.title}
                        text={module.description}
                      />
                    );
                  })} */}

                  {improvementResult.map((data, index) => {
                    return (
                      <ImprovementCard
                        key={data.id}
                        title={data.beh_gap_title}
                        text={data.rec_desc_summary}
                        url={data.learn_more_url}
                      />
                    );
                  })}
                </div>
                <hr className={styles["dashboard-hr"]} />
                <div className={styles["rci-tab-container"]}>
                  <div
                    onClick={() => {
                      dispatch(setTabSelected("Recommended"));
                    }}
                    className={
                      tabSelected === "Recommended"
                        ? styles["rci-item-selected"]
                        : styles["rci-item"]
                    }
                  >
                    Recommended
                  </div>
                  <div
                    onClick={() => {
                      dispatch(setTabSelected("Completed"));
                    }}
                    className={
                      tabSelected === "Completed"
                        ? styles["rci-item-selected"]
                        : styles["rci-item"]
                    }
                  >
                    Completed
                  </div>
                  <div
                    onClick={() => {
                      dispatch(setTabSelected("In Progress"));
                    }}
                    className={
                      tabSelected === "In Progress"
                        ? styles["rci-item-selected"]
                        : styles["rci-item"]
                    }
                  >
                    In Progress
                  </div>
                </div>
                <div className={styles["rci-content-container"]}>
                  {tabSelected === "Recommended" ? (
                    <div className={styles["rci-list"]}>
                      {dummyRecommendedModules.map((module) => {
                        return (
                          <div
                            className={styles["rci-content-item"]}
                            key={module.id}
                          >
                            <SmallCard
                              id={module.id}
                              title={module.title}
                              description={module.description}
                            />
                          </div>
                        );
                      })}
                      {/* {simulationResultData.modules[0].simulation.outcome.map(
                        (rec_module) => {
                          return (
                            <div
                              className={styles["rci-content-item"]}
                              key={rec_module.id}
                            >
                              <SmallCard
                                id={rec_module.id}
                                title={rec_module.rec_title}
                                description={rec_module.rec_desc}
                              />
                            </div>
                          );
                        }
                      )} */}
                      {RECOMMENDED_EMPTY_ARR.map((item, index) => {
                        return (
                          <div
                            className={styles["empty-item"]}
                            key={index}
                          ></div>
                        );
                      })}
                    </div>
                  ) : null}
                  {tabSelected === "Completed" ? (
                    <div className={styles["rci-list"]}>
                      {dummyCompletedModules.map((module) => {
                        return (
                          <div
                            className={styles["rci-content-item"]}
                            key={module.id}
                          >
                            <SmallCard
                              id={module.id}
                              title={module.title}
                              description={module.description}
                            />
                          </div>
                        );
                      })}
                      {COMPLETED_EMPTY_ARR.map((item, index) => {
                        return (
                          <div
                            className={styles["empty-item"]}
                            key={index}
                          ></div>
                        );
                      })}
                    </div>
                  ) : null}
                  {tabSelected === "In Progress" ? (
                    <div className={styles["rci-list"]}>
                      {dummyInProgressModules.map((module) => {
                        return (
                          <div
                            className={styles["rci-content-item"]}
                            key={module.id}
                          >
                            <SmallCard
                              id={module.id}
                              title={module.title}
                              description={module.description}
                            />
                          </div>
                        );
                      })}
                      {INPROGRESS_EMPTY_ARR.map((item, index) => {
                        return (
                          <div
                            className={styles["empty-item"]}
                            key={index}
                          ></div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Container>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Dashboard;
