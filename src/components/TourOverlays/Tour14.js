import React, {useState, useLayoutEffect} from "react";
import {getPositionSetOverlayStyle} from "./getPositionSetOverlayStyle";
import TourWindow from "../TourWindow/TourWindow";

const Tour14 = (props) => {
  const [x, setX] = useState();
  const [y, setY] = useState();

  document.documentElement.scrollTop = 0;
  document.body.style.overflow = "hidden";

  useLayoutEffect(() => {
    function updateSize() {
      const [x2, y2] = getPositionSetOverlayStyle(
        "single-activity-banner-button"
      );
      setX(x2);
      setY(y2);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div>
      <TourWindow
        X={x}
        Y={y}
        title="Tour - Activity"
        message={`You can click the start button to begin a simulation`}
        next={props.next}
        nextMsg="Next"
        currentRoute="/modules/1/activities/1"
        nextRoute="/dashboard"
      />
    </div>
  );
};
export default Tour14;
