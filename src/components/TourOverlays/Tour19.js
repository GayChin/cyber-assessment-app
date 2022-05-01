import React, {useState, useLayoutEffect} from "react";
import {getPositionSetOverlayStyle} from "./getPositionSetOverlayStyle";
import TourWindow from "../TourWindow/TourWindow";

const Tour19 = (props) => {
  const [x, setX] = useState();
  const [y, setY] = useState();

  document.documentElement.scrollTop = 480;
  document.body.style.overflow = "hidden";

  useLayoutEffect(() => {
    function updateSize() {
      const [x2, y2] = getPositionSetOverlayStyle("dashboard-recommended");
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
        message={`You can check out what are the recommended modules, the modules you have completed and modules that are still in progress here`}
        next={props.next}
        prevMsg="Previous"
        nextMsg="Next"
        currentRoute="/dashboard"
      />
    </div>
  );
};
export default Tour19;
