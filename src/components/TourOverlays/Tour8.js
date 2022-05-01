import React, {useState, useLayoutEffect} from "react";
import {getPositionSetOverlayStyle} from "./getPositionSetOverlayStyle";
import TourWindow from "../TourWindow/TourWindow";

const Tour8 = (props) => {
  const [x, setX] = useState();
  const [y, setY] = useState();

  document.documentElement.scrollTop = 0;
  document.body.style.overflow = "hidden";

  useLayoutEffect(() => {
    function updateSize() {
      const [x2, y2] = getPositionSetOverlayStyle(
        "activity-banner",
        "activity-banner-desc"
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
        title="Tour - Activities"
        message={`In here, you will see the description of the module that these activities are part of.`}
        next={props.next}
        nextMsg="Next"
        currentRoute="/modules/1"
      />
    </div>
  );
};
//   position,
//   title,
//   message,
//   next,
//   nextMsg,
//   prevMsg,
//   noPrevious, (Optional)
//   currentRoute,
//   previousRoute, (Optional)
//   nextRoute (Optional)
export default Tour8;
