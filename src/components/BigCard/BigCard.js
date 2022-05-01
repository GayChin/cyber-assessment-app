import React from "react";
import styles from "./BigCard.module.scss";
import bigCardImg from "./images/BigCardImg.png";

const BigCard = () => {
  return (
    <div className={styles["card-container"]}>
      <div className={styles["image-container"]}>
        <img src={bigCardImg} alt="big card img"></img>
        <span className={styles["card-title"]}>ACTIVITY TITLE</span>
      </div>
      <div className={styles["description-container"]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Id consectetur purus
        ut faucibus pulvinar. Neque laoreet suspendisse interdum consectetur
        libero id. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id
        consectetur purus ut faucibus pulvinar. Neque laoreet suspendisse
        interdum consectetur libero id. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Id consectetur purus ut faucibus pulvinar. Neque laoreet
        suspendisse interdum consectetur libero id. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Id consectetur purus ut faucibus pulvinar. Neque
        laoreet suspendisse interdum consectetur libero id.
      </div>
    </div>
  );
};

export default BigCard;
