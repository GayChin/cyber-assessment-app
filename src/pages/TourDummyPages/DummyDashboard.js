import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "react-bootstrap";
import styles from "./../Dashboard.module.scss";
import {ProgressCard} from "../../components/DashboardComponents/ProgressCard";
import {ImprovementCard} from "../../components/DashboardComponents/ImprovementCard";
import GenericBanner from "../../components/GenericBanner/GenericBanner";
import Footer from "../../components/Footer/Footer";
import {setTabSelected} from "../../redux/dashboardData/dashboardDataSlice";
import SmallCard from "../../components/SmallCard/SmallCard";

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

const DummyDashboard = () => {
  const dispatch = useDispatch();
  const tabSelected = useSelector((state) => state.dashboardData.tabSelected);

  return (
    <div>
      <br />
      <br />
      <GenericBanner title="DASHBOARD" searchBar={false} />
      <Container className={styles["bootstrap-container"]}>
        <div className={styles["dashboard-container"]}>
          <div className={styles["dashboard-center"]}>
            <div id="dashboard-progress">
              <h1 className={styles["sub-titles"]}>My Progress</h1>
              <div className={styles["progress-cards-row"]}>
                <ProgressCard text="Total Resilience level" number={5} />
                <ProgressCard text="Modules completed" number={4} />
                <ProgressCard text="Activities completed" number={10} />
              </div>
            </div>
            <hr className={styles["dashboard-hr"]} />

            <div id="dashboard-improvement">
              <h1 className={styles["sub-titles"]}>Improvements</h1>
              <div className={styles["improvement-cards-row"]}>
                {dummyRecommendedModules.map((module) => {
                  return (
                    <ImprovementCard
                      id={module.id}
                      title={module.title}
                      text={module.description}
                    />
                  );
                })}
              </div>
            </div>
            <hr className={styles["dashboard-hr"]} />

            <div id="dashboard-recommended">
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
                    {RECOMMENDED_EMPTY_ARR.map((item, index) => {
                      return (
                        <div className={styles["empty-item"]} key={index}></div>
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
                        <div className={styles["empty-item"]} key={index}></div>
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
                        <div className={styles["empty-item"]} key={index}></div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default DummyDashboard;
