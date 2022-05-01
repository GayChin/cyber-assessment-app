import React from "react";
import Footer from "../../components/Footer/Footer";
import GenericBanner from "../../components/GenericBanner/GenericBanner";
import SmallCard from "../../components/SmallCard/SmallCard";
import {Container} from "react-bootstrap";
import styles from "../Modules.module.scss";

const activities = [
  {
    simulation_id: 1,
    name: "Phishing",
    type: "simulation",
    url: "phishing",
    banner_img_bin: null,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    learning_outcomes: ["Point I", "Point J"],
    duration_length: 90,
  },
  {
    simulation_id: 2,
    name: "Simulation 2",
    type: "simulation",
    url: "sim3",
    banner_img_bin: null,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    learning_outcomes: ["Point I", "Point J"],
    duration_length: 30,
  },
  {
    simulation_id: 3,
    name: "Simulation 3",
    type: "simulation",
    url: "sim4",
    banner_img_bin: null,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    learning_outcomes: ["Point I", "Point J"],
    duration_length: 90,
  },
];

const EMPTY_SPACE = activities.length % 3;
const EMPTY_ARR = [];
for (let i = 0; i <= EMPTY_SPACE; i++) {
  EMPTY_ARR.push(".");
}

const DummyActivityPage = () => {
  return (
    <div>
      <br />
      <br />
      <div id="activity-banner">
        <GenericBanner
          title="ACTIVITIES"
          searchBar={false}
          thingsToSearch={"Activities"}
          id="activity-banner-desc"
        />
      </div>
      <Container className={styles["bootstrap-container"]}>
        <div
          id="activity-list-container"
          className={styles["modules-container"]}
        >
          <div className={styles["modules-list"]}>
            {activities.map((activity, index) => {
              return (
                <div className={styles["modules-item"]} key={index}>
                  <SmallCard
                    id={activity.simulation_id}
                    tourId = {`activity-card-${activity.simulation_id}`}
                    title={activity.name}
                    description={activity.description}
                    url={`/modules/${index + 1}/activities/${
                      activity.simulation_id
                    }`}
                    nonClickable={true}
                  />
                </div>
              );
            })}
            {EMPTY_ARR.map((item, index) => {
              return <div className={styles["empty-item"]} key={index}></div>;
            })}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default DummyActivityPage;
