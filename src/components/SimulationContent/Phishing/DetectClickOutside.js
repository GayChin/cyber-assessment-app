import React, {useEffect, useRef} from "react";
import {setUrlStatus} from "../../../redux/simulationData/phishingData/phishingDataSlice";
import {useDispatch} from "react-redux";

const useDetectOutside = (ref) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(setUrlStatus(false));
      }
    };
    document.addEventListener("mousedown", handleClick); //Step 5, a custom event listener is created
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]); //UseEffect dependent on ref (convert from null into an object pointer), so Useffect runs (Step 4)
};

export default function DetectClickOutside(props) {
  const tempRef = useRef(null); //ref = Null
  useDetectOutside(tempRef); // ref = Null

  return <div ref={tempRef}>{props.children}</div>; //Ref is now a pointer to Div element (Step 3)
}
