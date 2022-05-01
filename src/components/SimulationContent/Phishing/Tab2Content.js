import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setSelectedBeforeTab2} from "../../../redux/simulationData/phishingData/phishingDataSlice";
const Tab2Content = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedBeforeTab2(true));
    console.log("setting before tab 2...");
  });
  return <div>This is tab 2 content</div>;
};

export default Tab2Content;
