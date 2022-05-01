import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {MdClose} from "react-icons/md";
import {useHistory, useLocation} from "react-router-dom";
import styles from "./TourWindow.module.scss";
import {GeneralButton} from "../GeneralButton/GeneralButton";
import {resetOverlayStyle} from "../TourOverlays/resetOverlayStyle";
import {setTourIdx, setIsTourRunning} from "../../redux/general/generalSlice";

const TourWindow = ({
  position,
  X,
  Y,
  title,
  message,
  next,
  nextMsg,
  noNext,
  noPrevious, //   noPrevious, (Optional)
  currentRoute,
  previousRoute, //   previousRoute, (Optional)
  nextRoute, //   nextRoute (Optional)
}) => {
  const tourIdx = useSelector((state) => state.general.tourIdx);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (currentRoute !== location.pathname) {
      // Redirect to the correct path
      history.push(currentRoute);
    }
  }, []);

  const nextFunc = () => {
    dispatch(setTourIdx(tourIdx + 1));
    if (nextRoute !== "") {
      history.push(nextRoute);
    }
    return;
  };

  const finalNextFunc = () => {
    resetTour()
    document.documentElement.scrollTop = 0;
    document.body.style.overflow = "visible";
    return;
  };

  const previousFunc = () => {
    if (tourIdx > 0) {
      dispatch(setTourIdx(tourIdx - 1));
      if (previousRoute !== "") {
        history.push(previousRoute);
      }
    }
    return;
  };

  let paragraphs;
  try {
    paragraphs = message
      .split("\n")
      .map((string, index) => <p key={index}>{string}</p>);
  } catch (e) {
    paragraphs = message;
  }

  const resetTour = () => {
    dispatch(setIsTourRunning(false));
    document.body.style.overflow = "visible";
    resetOverlayStyle();
    dispatch(setTourIdx(0));
    history.push("/");
  };

  return (
    <div
      className={`${styles["tour-window"]} ${styles["translation"]} ${styles[position]}`}
      style={{left: X, top: Y}}
    >
      <div className={styles["tour-title"]}>
        <div>{title}</div>
        <div className={styles["tour-close-btn-container"]}>
          <button
            className={styles["tour-close-btn"]}
            onClick={() => resetTour()}
          >
            <MdClose className={styles["cross"]} />
          </button>
        </div>
      </div>
      <div className={styles["message-container"]}>
        <div className={styles["paragraph"]}>{paragraphs}</div>
        <div className={styles["tour-window-buttons-container"]}>
          {noPrevious === false ? (
            <GeneralButton
              text="Previous"
              buttonSize="btn-extra-small"
              buttonStyle="btn-plump-purple"
              buttonRadius="btn-less-slightly-rounded"
              onClick={previousFunc}
            />
          ) : (
            <></>
          )}
          {noNext === false ? (
            <GeneralButton
              text={nextMsg}
              buttonSize="btn-extra-small"
              buttonStyle="btn-plump-purple"
              buttonRadius="btn-less-slightly-rounded"
              onClick={next === "next" ? nextFunc : finalNextFunc}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

TourWindow.defaultProps = {
  noPrevious: false,
  noNext: false,
  inlineStyle: "",
  prevRoute: "",
  nextRoute: "",
};

export default TourWindow;
