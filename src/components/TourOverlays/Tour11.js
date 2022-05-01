import React, {useEffect} from "react";
import TourWindow from "../TourWindow/TourWindow";
import { resetOverlayStyle } from "./resetOverlayStyle";

const Tour11 = (props) => {

  document.documentElement.scrollTop = 0;
  document.body.style.overflow = "hidden";
  
  useEffect(() => {
    resetOverlayStyle();
  }, []);

  return (
    <div>
      <TourWindow
        position="center"
        title="Tour - Activity"
        message={`Welcome to the activity details page. This page shows the details of a particular activity. `}
        next={props.next}
        nextMsg="Next"
        currentRoute="/modules/1/activities/1"
        previousRoute="/modules/1"
      />
    </div>
  );
};
export default Tour11;
