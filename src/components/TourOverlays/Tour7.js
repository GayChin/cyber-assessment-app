import React, {useEffect} from "react";
import {resetOverlayStyle} from "./resetOverlayStyle";
import TourWindow from "../TourWindow/TourWindow";

const Tour7 = (props) => {
  document.documentElement.scrollTop = 0;
  document.body.style.overflow = "hidden";

  useEffect(() => {
    resetOverlayStyle();
  }, []);

  return (
    <TourWindow
      title="Tour - Activities page"
      position="center"
      message={`Welcome to the activity list page. This page lists down all the activities contained within a particular module.`}
      next={props.next}
      nextMsg="Next"
      currentRoute="/modules/1"
      previousRoute="/modules"
    />
  );
};

export default Tour7;
