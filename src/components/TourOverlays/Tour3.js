import React, {useEffect} from "react";
import {resetOverlayStyle} from "./resetOverlayStyle";
import TourWindow from "../TourWindow/TourWindow";

const Tour3 = (props) => {
  document.documentElement.scrollTop = 0;
  document.body.style.overflow = "hidden";

  useEffect(() => {
    resetOverlayStyle();
  }, []);

  return (
    <TourWindow
      position="center"
      title="Tour - Modules"
      message={`Hey there, feel free to do the module. We are very sure that you can learn something useful from it. And having fun with the simulation that we prepared.`}
      next={props.next}
      nextMsg="Next"
      currentRoute="/modules"
      previousRoute="/"
    />
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
export default Tour3;
