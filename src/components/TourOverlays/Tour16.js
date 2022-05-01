import React, {useLayoutEffect} from "react";
import TourWindow from "../TourWindow/TourWindow";
import {resetOverlayStyle} from "./resetOverlayStyle";

const Tour16 = (props) => {
  document.documentElement.scrollTop = 0;
  document.body.style.overflow = "hidden";

  useLayoutEffect(() => {
    resetOverlayStyle();
  }, []);

  return (
    <div>
      <TourWindow
        position="center"
        title="Tour - Dashboard"
        message={`Welcome to the Dashboard\nYou can check your progress, some improvements and recommended modules.`}
        prevMsg="Previous"
        next={props.next}
        nextMsg="Next"
        previousRoute="/modules/1/activities/1"
        currentRoute="/dashboard"
      />
    </div>
  );
};
export default Tour16;
