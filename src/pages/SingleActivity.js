import React, {useEffect, useState} from "react";
import Footer from "../components/Footer/Footer";
import styles from "./SingleActivity.module.scss";
import {Container, Spinner} from "react-bootstrap";
import {useParams} from "react-router";
import {getSimulation} from "../services/api/simulation";
import SingleActivityBanner from "../components/SingleActivityBanner/SingleActivityBanner";

const SingleActivity = () => {
  const [activity, setActivity] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // TODO: CALL THE NEW API HERE, EVEN THE USER IS NOT LOGGED ON, getSimulation()
  const {activityId} = useParams();

  useEffect(() => {
    async function getActivities() {
      setIsLoading(true);
      let response = await getSimulation(activityId);
      if (response) {
        console.log(response[0]);
        setActivity(response[0]);
      }
      setIsLoading(false);
    }
    getActivities();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className={styles["spinner-container"]}>
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <SingleActivityBanner activity={activity} />
          <Container className={styles["bootstrap-container"]}>
            <div className={styles["single-activity-container"]}>
              <div className={styles["learning-outcomes-container"]}>
                <div>
                  <strong>Learning Outcomes</strong>
                </div>
                <br />
                <ul className="ml-5">
                  {activity.learning_outcomes?.map((point, index) => (
                    <li key={index}> {point} </li>
                  ))}
                </ul>
              </div>
              <br />
              <hr className={styles["single-activity-hr"]} />
              <br />
            </div>
          </Container>
          <Footer />
        </>
      )}
    </div>
  );
};

export default SingleActivity;
