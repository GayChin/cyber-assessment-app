import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tab1Content from "./Tab1Content";
import Tab2Content from "./Tab2Content";
import Tab3Content from "./Tab3Content";
import {
  addEmail,
  setInboxNewestId,
  setIncomingEmail,
  removeBookmarkedContent,
  removeMarkedAsReadContent
} from "../../../redux/simulationData/phishingData/phishingDataSlice";
import { reportTemplateItem } from "../../../constant/reportTemplateItem";

const TabContent = (props) => {
  const dispatch = useDispatch();
  const reportedPhishList = useSelector(
    (state) => state.phishingData.reportedPhishList
  );
  const reportedPhishSize = useRef(reportedPhishList.length);
  const inboxNewestIdFromRedux = useSelector((state) => state.phishingData.inboxNewestId);
  const reportedInboxId = useSelector((state) => state.phishingData.reportedInboxId)
  const nonce = useSelector((state) => state.phishingData.nonce)

  useEffect(() => {
    console.log("reported obj size : ", reportedPhishSize.current);

    if (reportedInboxId >= 1 && reportedInboxId <= 6) {
      const temp = inboxNewestIdFromRedux
      dispatch(setInboxNewestId(inboxNewestIdFromRedux + 1));
      setTimeout(() => {
        dispatch(setIncomingEmail(true));
        dispatch(addEmail(reportTemplateItem(temp)));
        setTimeout(() => {
          dispatch(setIncomingEmail(false));
        }, 2000);
      }, 2000);
    } else if (reportedInboxId >= 7) {
      // replace the time
      setTimeout(() => {
        dispatch(setIncomingEmail(true));
        // remove the reported email
        
        dispatch(removeBookmarkedContent(reportedInboxId));
        dispatch(removeMarkedAsReadContent(reportedInboxId));
        dispatch(addEmail(reportTemplateItem(reportedInboxId)));

        setTimeout(() => {
          dispatch(setIncomingEmail(false));
        }, 2000);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce])
  
  // WHEN THEY REPORT ID - 7 until 12, we just replace with new time
  // WHEN THEY REPORT ID 1-6, WE ADD 1 TO THE REPORT TEMPLATE IDS

  return (
    <>
      {props.selectedTab === "Out1ook" ? (
        <Tab1Content />
      ) : props.selectedTab === "Tab2" ? (
        <Tab2Content />
      ) : props.selectedTab === "Tab3" ? (
        <Tab3Content />
      ) : <></>}
    </>
  );
};

export default TabContent;
