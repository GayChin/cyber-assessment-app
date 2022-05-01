import React, {useState} from "react";
import {useSelector} from "react-redux";

import styles from "./Phishing.module.scss";
const VerificationHref = ({string, link, onClick}) => {
  let OFFSET_X = 0;
  const inboxSelected = useSelector(
    (state) => state.phishingData.inboxSelected
  );

  const [style, setStyle] = useState({
    display: "none",
  });

  function onHover() {
    if (inboxSelected === 3) {
      OFFSET_X = "-80px";
    } else {
      OFFSET_X = "0px";
    }
    setStyle({
      display: "inline",
      position: "absolute",
      bottom: "20px",
      right: OFFSET_X,
      backgroundColor: "white",
      boxShadow: "0px 3px 3px grey",
      padding: "0 5px 0 5px",
      minWidth: "100px",
      maxWidth: "300px",
      overflowWrap: "break-word",
      minHeight: "10px",
      zIndex: "9999",
    });
  }
  return (
    <div
      className={styles["inner-href"]}
      onClick={() => onClick()}
      onMouseEnter={() => onHover()}
      onMouseLeave={() => setStyle({display: "none"})}
    >
      <div style={{display: "inline"}}>{string}</div>
      <div className={styles["hover-link"]} style={style}>
        {link}
      </div>
    </div>
  );
};

export default VerificationHref;
