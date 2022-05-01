import React from "react";
import styles from "./Phishing.module.scss";
import {useSelector, useDispatch} from "react-redux";
import {BiLockAlt, BiLockOpenAlt} from "react-icons/bi";
import UrlStatus from "./UrlStatus";
import {setCheckpoint} from "../../../redux/checkpoint/checkpointSlice";

import {setUrlStatus} from "../../../redux/simulationData/phishingData/phishingDataSlice";
import DetectClickOutside from "./DetectClickOutside";

const UrlBar = (props) => {
  let url = null;
  const urlStatus = useSelector((state) => state.phishingData.urlStatus);
  const tabSelected = useSelector((state) => state.phishingData.tabSelected);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(urlStatus);
  // });

  // const [style, setStyle] = useState({
  //   display: "none",
  // });

  function onClickLock() {
    dispatch(setUrlStatus(true));
    if (tabSelected === "Tab3") {
      dispatch(setCheckpoint({checkpointName: "checkpoint11", status: true}));
    }
  }

  function hideUrlStatus() {
    dispatch(setUrlStatus(false));
  }

  switch (props.selectedTab) {
    case "Out1ook":
      url = "https://out1ook.office365.com/mail/archive/id/";
      break;
    case "Tab2":
      url = "https://www.academia.com";
      break;
    case "Tab3":
      url = "http://www.dr0pbox.com";
      break;
    default:
      url = "Search with Google or type a URL";
  }

  return (
    <div className={styles["url-bar"]}>
      <DetectClickOutside>
        {props.selectedTab === "Tab3" ? (
          <div
            className={
              urlStatus ? styles["lock-style"] : styles["lock-style-null"]
            }
            onMouseDown={
              urlStatus ? () => hideUrlStatus() : () => onClickLock()
            }
          >
            <BiLockOpenAlt />
          </div>
        ) : (
          <div
            className={
              urlStatus ? styles["lock-style"] : styles["lock-style-null"]
            }
            onMouseDown={
              urlStatus ? () => hideUrlStatus() : () => onClickLock()
            }
          >
            <BiLockAlt />
          </div>
        )}
        <div
          className={
            urlStatus ? styles["display-url-status"] : styles["hide-url-status"]
          }
        >
          {props.selectedTab === "Tab3" ? (
            <UrlStatus secure={false} />
          ) : (
            <UrlStatus secure={true} />
          )}
        </div>
      </DetectClickOutside>

      <div style={{marginLeft: "5px"}}>{url}</div>
    </div>
  );
};
export default UrlBar;
