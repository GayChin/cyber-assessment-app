import React, {useEffect, useState} from "react";
import Footer from "../components/Footer/Footer";
import GenericBanner from "../components/GenericBanner/GenericBanner";
import SmallCard from "../components/SmallCard/SmallCard.js";
import styles from "./Modules.module.scss";
import {Container} from "react-bootstrap";
import {getModule} from "../services/api/module";
import {Spinner} from "react-bootstrap";

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const EMPTY_SPACE = modules.length % 3;
  const EMPTY_ARR = [];
  for (let i = 0; i <= EMPTY_SPACE; i++) {
    EMPTY_ARR.push(".");
  }

  useEffect(() => {
    async function getModules() {
      let response = await getModule();
      if (response) {
        setModules(response);
        setIsLoading(false);
      }
    }
    getModules();
  }, []);

  return (
    <div>
      <br />
      <br />
      <GenericBanner title="MODULE" searchBar={false} />
      <Container className={styles["bootstrap-container"]}>
        <div className={styles["modules-container"]}>
          {!isLoading ? (
            <div className={styles["modules-list"]}>
              {modules.map((module) => {
                return (
                  <div
                    className={styles["modules-item"]}
                    key={module.module_id}
                  >
                    <SmallCard
                      id={module.module_id}
                      title={module.module_name}
                      description={module.description}
                      url={`/modules/${module.module_id}`}
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

export default Modules;
