import React, {useEffect, useState} from "react";
import Footer from "../components/Footer/Footer";
import GenericBanner from "../components/GenericBanner/GenericBanner";
import SmallCard from "../components/SmallCard/SmallCard.js";
import styles from "./Modules.module.scss";
import {Container} from "react-bootstrap";
import {useParams} from "react-router";
import {getModule} from "../services/api/module";
import {Spinner} from "react-bootstrap";
// import { useHistory } from "react-router-dom";

// const dummyActivities = [
//   {
//     id: 1,
//     imgsrc:
//       "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29ya3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
//     parentMod: "Phishing",
//     title: "Email Scam",
//     type: "Simulation",
//     desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
//     duration: "25 min",
//     points: ["point1", "point2", "point3"],
//   },
//   {
//     id: 2,
//     imgsrc:
//       "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29ya3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
//     parentMod: "Phishing",
//     title: "Scam Email",
//     type: "Note",
//     desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
//     duration: "30 min",
//     points: ["point1", "point2", "point3", "point4"],
//   },
//   {
//     id: 3,
//     imgsrc:
//       "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29ya3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
//     parentMod: "Phishing",
//     title: "Clickbait",
//     type: "Video",
//     desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
//     duration: "45 min",
//     points: ["point1", "point2", "point3", "point4", "point5"],
//   },
//   {
//     id: 4,
//     imgsrc:
//       "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29ya3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
//     parentMod: "Phishing",
//     title: "Unsolicited Ads",
//     type: "Example",
//     desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
//     duration: "15 min",
//     points: ["point1", "point2"],
//   },
// ];

const Activities = () => {
  const activities = [
    {
      simulation_id: 2,
      name: "Password",
      type: "simulation",
      url: "password",
      banner_img_bin: null,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry ",
      learning_outcomes: ["Point I", "Point J"],
      duration_length: 30,
    },
    {
      simulation_id: 3,
      name: "Simulation 3",
      type: "simulation",
      url: "sim3",
      banner_img_bin: null,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      learning_outcomes: ["Point I", "Point J"],
      duration_length: 30,
    },
    {
      simulation_id: 4,
      name: "Simulation 4",
      type: "simulation",
      url: "sim4",
      banner_img_bin: null,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      learning_outcomes: ["Point I", "Point J"],
      duration_length: 90,
    },
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
  ];

  const {moduleId} = useParams();

  useEffect(() => {
    async function getActivities() {
      let response = await getModule(moduleId);
      if (response) {
        // setActivities(response[0].simulation_ids);
        // HEREREHERHE
        console.log(response[0].simulation_ids);
        setIsLoading(false);
      }
    }
    // getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(moduleId);
  // const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const EMPTY_SPACE = activities.length % 3;
  const EMPTY_ARR = [];
  for (let i = 0; i <= EMPTY_SPACE; i++) {
    EMPTY_ARR.push(".");
  }
  // const history = useHistory();
  // const directSingleActivity = (id) => {
  //   history.push(`/activity/${id}`);
  // };

  return (
    <div>
      <br />
      <br />
      <div id="activity-banner">
        <GenericBanner
          title="ACTIVITIES"
          searchBar={false}
          thingsToSearch={"Activities"}
        />
      </div>
      <Container className={styles["bootstrap-container"]}>
        <div
          id="activity-list-container"
          className={styles["modules-container"]}
        >
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
};

export default Activities;
