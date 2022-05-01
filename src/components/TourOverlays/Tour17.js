import React, {useState, useLayoutEffect} from "react";
import {getPositionSetOverlayStyle} from "./getPositionSetOverlayStyle";
import TourWindow from "../TourWindow/TourWindow";

const Tour17 = (props) => {
  const [x, setX] = useState();
  const [y, setY] = useState();

  document.documentElement.scrollTop = 0;
  document.body.style.overflow = "hidden";

  useLayoutEffect(() => {
    function updateSize() {
      const [x2, y2] = getPositionSetOverlayStyle("dashboard-progress");
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
        message={`You can check your progress result here such as 'Resilience level', 'Modules completed' and 'Activities completed'`}
        prevMsg="Previous"
        next={props.next}
        nextMsg="Next"
        currentRoute="/dashboard"
      />
    </div>
  );
};
export default Tour17;
