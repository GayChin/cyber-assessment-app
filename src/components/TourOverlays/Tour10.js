import React, {useState, useLayoutEffect} from "react";
import {getPositionSetOverlayStyle} from "./getPositionSetOverlayStyle";
import TourWindow from "../TourWindow/TourWindow";
import {setTourIdx} from "../../redux/general/generalSlice";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const Tour10 = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [x, setX] = useState();
  const [y, setY] = useState();

  document.documentElement.scrollTop = 0;
  document.body.style.overflow = "hidden";

  useLayoutEffect(() => {
    document.getElementById("activity-card-1").onclick = function () {
      dispatch(setTourIdx(10));
      history.push("/modules/1/activities/1");
    };

    function updateSize() {
      const [x2, y2] = getPositionSetOverlayStyle("activity-card-1");
      setX(x2);
      setY(y2);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <TourWindow
        X={x}
        Y={y}
        title="Tour - Activities"
        message={`Please click this activity card to view the activity page.`}
        noNext={true}
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
export default Tour10;
