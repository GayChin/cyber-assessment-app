import React, {useEffect, useState} from "react";
import {getPositionSetOverlayStyle} from "./getPositionSetOverlayStyle";
import TourWindow from "../TourWindow/TourWindow";

const Tour2 = (props) => {
  const [x, setX] = useState();
  const [y, setY] = useState();
  document.documentElement.scrollTop = 0;
  document.body.style.overflow = "hidden";

  useEffect(() => {
    const [x2, y2] = getPositionSetOverlayStyle("nav-modules");
    setX(x2);
    setY(y2);
  });

  return (
    <div>
      <TourWindow
        X={x}
        Y={y}
        title="Tour - Homepage"
        message={`Please click "MODULES" button to navigate to module list page.`}
        noNext={true}
        currentRoute="/"
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
export default Tour2;
