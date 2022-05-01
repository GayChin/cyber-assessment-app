import React, {useEffect, useRef} from "react";
import {store} from "../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import styles from "./Phishing.module.scss";
import {setEmails} from "../../../redux/outlookSidebar/outlookSidebarSlice";
import OutlookImage from "../../../images/outlookicon.png";
import OutlookSideBarItem from "./OutlookSideBarItem";
import {HiOutlineInbox} from "react-icons/hi";
import {
  IoBookmarksOutline,
  IoBookmarks,
  IoMailOpenOutline,
} from "react-icons/io5";
import {BiErrorAlt} from "react-icons/bi";
import {RiArrowDropDownLine} from "react-icons/ri";
import InboxItems from "./InboxItems";
import InboxContent from "./InboxContent";
import IncomingMail from "./IncomingMail";
import {
  toggleBookmarkedContent,
  toggleMarkedAsReadContent,
  removeBookmarkedContent,
  removeMarkedAsReadContent,
  reportPhishing,
  setReportedInboxId,
  setIncomingEmail,
  addEmail,
  selectInbox,
  addNonce,
  setTab2TimeoutTriggered,
} from "../../../redux/simulationData/phishingData/phishingDataSlice";
import {setCheckpoint} from "../../../redux/checkpoint/checkpointSlice";

// https://react-icons.github.io/react-icons/search?q=bin
const renderHeader = (ProfileImage) => {
  return (
    <div className={styles["outlook-header"]}>
      <div>
        <img
          src={OutlookImage}
          className={styles["header-img"]}
          alt="header-img"
        ></img>
        <span>Out1ook</span>
      </div>
      <div className={styles["profile-img-container"]}>
        <img
          src={ProfileImage}
          className={styles["profile-img"]}
          alt="profile-img"
        ></img>
        <div className={styles["online-status"]}></div>
      </div>
    </div>
  );
};

const RenderSidebar = (props) => {
  return (
    <div className={styles["outlook-sidebar"]}>
      <OutlookSideBarItem
        name="Inbox"
        numberOfMails={props.inboxCount}
        icon={HiOutlineInbox}
      />
      {/* <OutlookSideBarItem
        name="Deleted Items"
        numberOfMails={props.deletedCount}
        icon={RiDeleteBinLine}
      /> */}
    </div>
  );
};

const RenderAction = ({contentHighlighted}) => {
  const dispatch = useDispatch();
  const inboxSelected = useSelector(
    (state) => state.phishingData.inboxSelected
  );

  const inboxSelectedRef = useRef(-1);

  const bookmarkList = useSelector((state) => state.phishingData.bookmarkList);
  return (
    <div
      className={
        contentHighlighted === "actionBar"
          ? `${styles["action-container"]} ${styles["highlight-content"]}`
          : styles["action-container"]
      }
    >
      {inboxSelected !== -1 ? (
        <>
          <button
            onClick={() => dispatch(toggleMarkedAsReadContent(inboxSelected))}
          >
            <IoMailOpenOutline />
            Read/Unread
          </button>
          <button
            onClick={() => {
              // User clicks on the report phishing button
              // Delete the email & add the email's ID to the set
              if (
                inboxSelected !== inboxSelectedRef.current ||
                inboxSelected >= 7
              ) {
                dispatch(removeBookmarkedContent(inboxSelected));
                dispatch(removeMarkedAsReadContent(inboxSelected));
                dispatch(reportPhishing(inboxSelected));
                inboxSelectedRef.current = inboxSelected;
                if (inboxSelected === 4) {
                  dispatch(
                    setCheckpoint({
                      checkpointName: "checkpoint6",
                      status: true,
                    })
                  );
                }
                dispatch(setReportedInboxId(inboxSelected));
                dispatch(addNonce());
                dispatch(selectInbox(-1));
              }
            }}
          >
            <BiErrorAlt />
            Report
          </button>
          <>
            {bookmarkList.includes(inboxSelected) ? (
              <button
                onClick={() => {
                  dispatch(toggleBookmarkedContent(inboxSelected));
                }}
              >
                <IoBookmarks />
                Bookmarked
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch(toggleBookmarkedContent(inboxSelected));
                }}
              >
                <IoBookmarksOutline />
                Bookmark
              </button>
            )}
          </>
        </>
      ) : (
        <>
          {" "}
          <button disabled>
            <IoMailOpenOutline />
            Read/Unread
          </button>
          <button disabled>
            <BiErrorAlt />
            Report
          </button>
          <button disabled>
            <IoBookmarksOutline />
            Bookmark
          </button>
        </>
      )}
      <IncomingMail />
    </div>
  );
};

const Tab1Content = () => {
  const dummyEmail = [
    {
      id: 0,
      sender_name: "Microsoft Outlook",
      sender_email_addr: "no-reply@microsoft.com",
      sender_img_base64:
        "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
      receiver: store.getState().user.userProfile.email,
      subject: "Welcome to Outlook",
      message:
        "Outlook helps you manage your life with powerful tools for email, calender, contacts and tasks.\nActivating collaborators are the people you have recently contacted through meetings, email, chats, and calls.\nIn Outlook you can select the contact to pin as important. Stay up to date with outstanding to-dos, unread emails, and more.\nLet's get start your journey with Microsoft Outlook.",
      received_time: Math.trunc(Date.now() / 1000),
      forwardMessage: false,
    },
  ];

  const dispatch = useDispatch();
  // const [inboxArraySize, setInboxArraySize] = useState(1);

  // const inboxTimer = 0;
  // let setTimer = true;

  const inboxCount = useSelector(
    (state) => state.outlookSidebar.inboxEmailCounter
  );
  const inboxArr = useSelector((state) => state.phishingData.inboxArr);
  const selectedTab = useSelector((state) => state.phishingData.tabSelected);
  const tabSelectedBefore = useSelector(
    (state) => state.phishingData.selectedBeforeTab2
  );

  const inboxSelected = useSelector(
    (state) => state.phishingData.inboxSelected
  );

  const reportedPhishList = useSelector(
    (state) => state.phishingData.reportedPhishList
  );
  //note: added by 1 already
  const email4 = store
    .getState()
    .phishingData.inboxTimedArr.find((inbox) => inbox.email_id === 4);

  const contentHighlighted = useSelector(
    (state) => state.phishingData.contentHighlighted
  );

  const inboxAmount = useSelector(
    (state) =>
      state.phishingData.inboxTimedArr.length -
      state.phishingData.markedAsReadList.length
  );

  const a = useSelector((state) => state.phishingData.inboxTimedArr.length);

  const b = useSelector((state) => state.phishingData.markedAsReadList.length);
  const c = useSelector((state) => state.phishingData.reportedPhishList.length);

  const tab2TimeoutTriggered = useSelector(
    (state) => state.phishingData.tab2TimeoutTriggered
  );

  useEffect(() => {
    //console.log("tab sb : ", tabSelectedBefore, ", ", selectedTab);
    if (
      !email4 &&
      tabSelectedBefore &&
      tab2TimeoutTriggered === false &&
      selectedTab === "Out1ook" &&
      reportedPhishList.indexOf(4) === -1
    ) {
      dispatch(setTab2TimeoutTriggered(true));
      setTimeout(() => {
        dispatch(setIncomingEmail(true));
        console.log("debug : dispatching 4th email 222");
        const inbox3ToAppend = {
          ...inboxArr[3],
          received_time: Math.trunc(Date.now() / 1000),
        };
        dispatch(addEmail(inbox3ToAppend));
      }, 1500);
      setTimeout(() => {
        dispatch(setIncomingEmail(false));
      }, 3500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  useEffect(() => {
    dispatch(setEmails({name: "Inbox", amount: inboxAmount}));
    console.log("inbox timed arr size  : ", a);
    console.log("marked as read size  : ", b);
    console.log("reported size  : " , c)
    // setTimer = false;
    // dispatch(setEmails({name: "DeletedItems", amount: 0}));
  }, [dispatch, inboxAmount]);
  //Assignments to the 'setTimer' variable from inside React Hook useEffect will be lost after each render. To preserve the value over time,
  // store it in a useRef Hook and keep the mutable value in the '.current' property.
  // Otherwise, you can move this variable directly inside useEffect.

  const inboxTimedArr = useSelector(
    (state) => state.phishingData.inboxTimedArr
  );

  const doingTutorial = useSelector(
    (state) => state.phishingData.doingTutorial
  );

  // doingTutorial state
  const inboxSelectedArray = doingTutorial
    ? dummyEmail
    : inboxTimedArr.filter((inbox) => {
        return inbox.email_id === inboxSelected;
      });

  const ProfileImage = useSelector((state) => state.user.userProfilePic);

  return (
    <>
      {renderHeader(ProfileImage)}
      <div className={styles["below-header-container"]}>
        <RenderSidebar inboxCount={inboxCount} />
        <div className={styles["right-below-header-container"]}>
          <RenderAction contentHighlighted={contentHighlighted} />
          <div className={styles["below-menu-container"]}>
            <div
              className={
                contentHighlighted === "inboxMenu"
                  ? `${styles["inbox-menu"]} ${styles["highlight-content"]}`
                  : styles["inbox-menu"]
              }
            >
              <div className={styles["inbox-dropdown-menu"]}>
                <RiArrowDropDownLine />
                Today
              </div>
              <InboxItems inboxTimedArr={inboxTimedArr} />
            </div>
            {/* <TutorialWindow
                title="lolicon"
                message="Once you’re confident that you’ve completed your assessment, click this button to submit your work for this particular assessment."
              /> */}
            <InboxContent
              selectedInboxContent={inboxSelectedArray}
              contentHighlighted={contentHighlighted}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab1Content;
