import React, {useState, useLayoutEffect} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {getPositionSetOverlayStyle} from "./getPositionSetOverlayStyle";
import TourWindow from "../TourWindow/TourWindow";
import { resetOverlayStyle } from "./resetOverlayStyle";

const Tour19 = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [x, setX] = useState();
  const [y, setY] = useState();

  document.documentElement.scrollTop = 450;
  document.body.style.overflow = "hidden";

  useLayoutEffect(() => {
    resetOverlayStyle()
  }, []);

  return (
    <div>
      <TourWindow
        X={x}
        Y={y}
        position="center"
        title="Tour - Dashboard"
        message={`You have finished the tour!`}
        next={props.next}
        prevMsg="Previous"
        nextMsg="Ok"
        previousRoute="/dashboard"
        currentRoute="/"
      />
    </div>
  );
};
export default Tour19;
