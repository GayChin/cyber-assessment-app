import React, {useLayoutEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {getPositionSetOverlayStyle} from "./getPositionSetOverlayStyle";
import TourWindow from "../TourWindow/TourWindow";
import {setTourIdx} from "../../redux/general/generalSlice";

const Tour6 = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [x, setX] = useState();
  const [y, setY] = useState();

  document.documentElement.scrollTop = 0;
  document.body.style.overflow = "hidden";

  useLayoutEffect(() => {
    document.getElementById("module-card-1").onclick = function () {
      dispatch(setTourIdx(6));
      history.push("/modules/1");
    };

    function updateSize() {
      const [x2, y2] = getPositionSetOverlayStyle("module-card-1");
      setX(x2);
      setY(y2);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TourWindow
      X={x}
      Y={y}
      title="Tour - Modules"
      message={`Please click this module card to view the module page.`}
      currentRoute="/modules"
      noNext={true}
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
export default Tour6;
