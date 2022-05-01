import React, {useEffect} from "react";
import {resetOverlayStyle} from "./resetOverlayStyle";
import TourWindow from "../TourWindow/TourWindow";

const Tour1 = (props) => {
  document.documentElement.scrollTop = 0;
  document.body.style.overflow = "hidden";

  useEffect(() => {
    resetOverlayStyle();
  }, []);

  return (
    <TourWindow
      position="center"
      title="Tour - Homepage"
      message={`Welcome to DRSBX\nDRSBX help company around the to improve their cyber security. Providing modules & activities to allow employee to have higher awareness towards cyber security.`}
      next={props.next}
      nextMsg="Next"
      noPrevious={true}
      currentRoute="/"
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
export default Tour1;

// window.scrollTo({top: 0, behavior: 'smooth'});
// setTimeout(() => {
//   document.body.style.overflow = "hidden";
// }, 2000);
//   useEffect(() => {
//   }, [fakeEvent])
// setTimeout(() => {
//   document.body.style.overflow = "hidden";
// }, 3000);
