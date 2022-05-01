import React, {useState, useLayoutEffect} from "react";
import {getPositionSetOverlayStyle} from "./getPositionSetOverlayStyle";
import TourWindow from "../TourWindow/TourWindow";
import {setTourIdx} from "../../redux/general/generalSlice";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const Tour15 = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [x, setX] = useState();
  const [y, setY] = useState();

  document.documentElement.scrollTop = 0;
  document.body.style.overflow = "hidden";

  useLayoutEffect(() => {
    document.getElementById("nav-db").onclick = function () {
      dispatch(setTourIdx(15));
      history.push("/dashboard");
    };

    function updateSize() {
      const [x2, y2] = getPositionSetOverlayStyle("nav-db");
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
        message={`When you have completed your activity, you can click on the 'Dashboard' button to check your progress`}
        noNext={true}
        nextMsg="Next"
        currentRoute="/modules/1/activities/1"
        nextRoute="/dashboard"
      />
    </div>
  );
};
export default Tour15;
