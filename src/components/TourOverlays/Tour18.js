import React, {useState, useLayoutEffect} from "react";
import {getPositionSetOverlayStyle} from "./getPositionSetOverlayStyle";
import TourWindow from "../TourWindow/TourWindow";

const Tour18 = (props) => {
  const [x, setX] = useState();
  const [y, setY] = useState();

  document.documentElement.scrollTop = 200;
  document.body.style.overflow = "hidden";

  useLayoutEffect(() => {
    function updateSize() {
      const [x2, y2] = getPositionSetOverlayStyle("dashboard-improvement");
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
        title="Tour - Dashboard"
        message={`The system will shows you some of the improvements for you to be made after you have done your activity.`}
        prevMsg="Previous"
        next={props.next}
        nextMsg="Next"
        currentRoute="/dashboard"
      />
    </div>
  );
};
export default Tour18;
