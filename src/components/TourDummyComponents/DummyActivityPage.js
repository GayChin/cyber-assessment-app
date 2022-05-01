import React from 'react'
import GenericBanner from '../GenericBanner/GenericBanner';
import {Container} from "react-bootstrap";
import styles from "./Modules.module.scss";

const activities =  [
  {
      "simulation_id": 2,
      "name": "Password",
      "type": "simulation",
      "url": "password",
      "banner_img_bin": null,
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "learning_outcomes": [
          "Point I",
          "Point J"
      ],
      "duration_length": 30
  },
  {
      "simulation_id": 3,
      "name": "Simulation 3",
      "type": "simulation",
      "url": "sim3",
      "banner_img_bin": null,
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "learning_outcomes": [
          "Point I",
          "Point J"
      ],
      "duration_length": 30
  },
  {
      "simulation_id": 4,
      "name": "Simulation 4",
      "type": "simulation",
      "url": "sim4",
      "banner_img_bin": null,
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "learning_outcomes": [
          "Point I",
          "Point J"
      ],
      "duration_length": 90
  },
  {
      "simulation_id": 1,
      "name": "Phishing",
      "type": "simulation",
      "url": "phishing",
      "banner_img_bin": null,
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "learning_outcomes": [
          "Point I",
          "Point J"
      ],
      "duration_length": 90
  }
]

const DummyActivityPage = () => {
  return (
    <div>
      <br />
      <br />
      <div id ="activity-banner">
      <GenericBanner title="ACTIVITIES" searchBar={false} thingsToSearch={"Activities"} />
      </div>
      <Container className={styles["bootstrap-container"]}>
        <div id = "activity-list-container" className={styles["modules-container"]}>
          {!isLoading ? (
            <div className={styles["modules-list"]}>
              {activities.map((activity, index) => {
                return (
                  <div
                    className={styles["modules-item"]}
                    key={index}
                    // onClick={() => directSingleActivity(activity.simulation_id)}
                  >
                    <SmallCard
                      id={activity.simulation_id}
                      title={activity.name}
                      description={activity.description}
                      url={`/modules/${moduleId}/activities/${activity.simulation_id}`}
                    />
                  </div>
                );
              })}
              {EMPTY_ARR.map((item, index) => {
                return <div className={styles["empty-item"]} key={index}></div>;
              })}
            </div>
          ) : (
            <div className={styles["spinner-container"]}>
              <Spinner animation="border" />
            </div>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default DummyActivityPage