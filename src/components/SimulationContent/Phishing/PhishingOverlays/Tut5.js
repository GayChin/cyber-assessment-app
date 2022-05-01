import React from "react";
import TutorialWindow from "../../../TutorialWindow/TutorialWindow";
import {IoBookmarksOutline, IoMailOpenOutline} from "react-icons/io5";
import {BiErrorAlt} from "react-icons/bi";
import styles from "../Phishing.module.scss";

const Tut5 = (props) => {
  const guide = (
    <div>
      <div className={styles["tut5-container"]}>
        <div>
          <IoMailOpenOutline />
          Read/Unread an email
        </div>
        <div>
          <BiErrorAlt />
          Report phishing
        </div>
        <div>
          <IoBookmarksOutline />
          Bookmark an email
        </div>
      </div>
    </div>
  );

  return (
    <TutorialWindow
      position="right"
      type="phishing"
      title="Tutorial - Phishing Simulation"
      message={guide}
      next={props.next}
      previous={props.previous}
      prevMsg="Previous"
      nextMsg="Start Simulation"
    />
  );
};

export default Tut5;
