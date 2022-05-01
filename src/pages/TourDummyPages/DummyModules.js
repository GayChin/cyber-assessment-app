import React from "react";
import Footer from "../../components/Footer/Footer";
import GenericBanner from "../../components/GenericBanner/GenericBanner";
import SmallCard from "../../components/SmallCard/SmallCard.js";
import styles from "../Modules.module.scss";
import {Container} from "react-bootstrap";

const DummyModules = () => {
  const dummyModules = [
    {
      module_id: 1,
      module_name: "Module 1 TESTTT",
      module_url: "module-1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industryyyyy",
    },
    {
      module_id: 2,
      module_name: "Module 2",
      module_url: "module-2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      module_id: 3,
      module_name: "Module 3",
      module_url: "module-3",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
  ];

  const EMPTY_SPACE = dummyModules.length % 3;
  const EMPTY_ARR = [];
  for (let i = 0; i <= EMPTY_SPACE; i++) {
    EMPTY_ARR.push(".");
  }

  return (
    <div>
      <br />
      <br />
      <div id="module-banner">
        <GenericBanner title="MODULE" searchBar={false} id="module-banner-desc"/>
      </div>
      <Container className={styles["bootstrap-container"]}>
        <div id="modules-list" className={styles["modules-container"]}>
          <div className={styles["modules-list"]}>
            {dummyModules.map((module) => {
              return (
                <div className={styles["modules-item"]} key={module.module_id}>
                  <SmallCard
                    id={module.module_id}
                    tourId = {`module-card-${module.module_id}`}
                    title={module.module_name}
                    description={module.description}
                    url={`/modules/${module.module_id}`}
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

export default DummyModules;
