import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Tab from "./Tab";
import OutlookImage from "../../../images/outlookicon.png";
import styles from "./Phishing.module.scss";
import {selectTab} from "../../../redux/simulationData/phishingData/phishingDataSlice";

// TODO:
// 1. TabArr = ["Out1ook"]
// 2. When click on tab3 inner href  TabArr = [...TabArr,"Tab3"]
// 3. When click on tab2 inner href  TabArr = [...TabArr,"Tab2"]  ["Out1ook", "Tab3", "Tab2"]
// 4. The latest tab clicked will always be the last element in the array
// 5. const filtered = tabArr.filter((tab) => {
//   return tab !== "Tab2"
// });
// 6. TabArr = filtered

const TabBar = ({selectedTab}) => {
  const dispatch = useDispatch();

  // Tabs in an array
  const tabArr = useSelector((state) => state.phishingData.tabArr);
  const tabSelected = useSelector((state) => state.phishingData.tabSelected);
  // console.log("Tab selected is : ",tabSelected);

  useEffect(() => {
    console.log("tab selected changed!")
    // console.log("use effect " , tabArr[tabArr.length - 1].tab_name)
    //   dispatch(selectTab(tabArr[tabArr.length - 1].tab_name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabArr, tabSelected]);

  return (
    <div className={styles["browser-background"]}>
      {tabArr.map((tab, index) => {
        return (
          <Tab
            key={index}
            name={tab.tab_name}
            img={OutlookImage}
            selectedTabClassName={selectedTab === tab.tab_name ? "selectedTab" : "tab"}
          />
        );
      })}
    </div>
  );
};

export default TabBar;
