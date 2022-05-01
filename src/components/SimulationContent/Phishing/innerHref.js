import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCheckpoint} from "../../../redux/checkpoint/checkpointSlice";
import {
  setDoneTutorial,
  setTutorialIdx,
} from "../../../redux/simulationData/phishingData/phishingDataSlice";
import {setHintsTimeout} from "../../../redux/simulationData/phishingData/phishingDataSlice";
import {store} from "../../../redux/store";
import styles from "./Phishing.module.scss";

const InnerHref = ({string, link, onClick, mailId, email}) => {
  const timeoutId = useSelector((state) => state.phishingData.hintsTimeout);
  let OFFSET_X = 0;
  let OFFSET_Y = 0;
  const dispatch = useDispatch();

  const [style, setStyle] = useState({
    display: "none",
  });

  function onHover() {
    //note: added by 1 already
    if (mailId === 6) {
      OFFSET_X = "-350px";
      OFFSET_Y = "5px";
    } else {
      OFFSET_X = "0px";
      OFFSET_Y = "20px";
    }
    setStyle({
      display: "inline",
      position: "absolute",
      bottom: OFFSET_Y,
      right: OFFSET_X,
      backgroundColor: "white",
      boxShadow: "0px 3px 3px grey",
      padding: "0 5px 0 5px",
      minWidth: "100px",
      maxWidth: "400px",
      overflowWrap: "break-word",
      minHeight: "10px",
      zIndex: "9999",
    });

    switch (mailId) {
      case 3:
        dispatch(setCheckpoint({checkpointName: "checkpoint2", status: true}));
        break;
      case 6:
        dispatch(setCheckpoint({checkpointName: "checkpoint9", status: true}));
        break;
      default:
        break;
    }
  }
  return (
    <div
      className={
        mailId !== 5 ? styles["inner-href"] : styles["noline-inner-href"]
      }
      onClick={() => {
        onClick();
      }}
      onMouseEnter={() => {
        if (email !== true) {
          onHover();
        }
      }}
      onMouseLeave={() => setStyle({display: "none"})}
    >
      {/* //note: added by 1 already */}
      {mailId === 6 && link.slice(0, 7) === "http://" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            background: "#0061FE",
            color: "white",
            width: "170px",
            height: "50px",
          }}
        >
          {string}
        </div>
      ) : (
        <div style={{display: "inline"}}>{string}</div>
      )}
      <div className={styles["hover-link"]} style={style}>
        {link}
      </div>
    </div>
  );
};

function dummyOnClick() {
  console.log("");
}

InnerHref.defaultProps = {
  onClick: dummyOnClick,
};
export default InnerHref;
