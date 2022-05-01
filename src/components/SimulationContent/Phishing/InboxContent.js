import React, {useState} from "react";
import styles from "./Phishing.module.scss";
import InnerHref from "./innerHref";
import VerificationHref from "./VerificationHref";
import {useDispatch, useSelector} from "react-redux";
import {FaDropbox} from "react-icons/fa";
import {
  selectTab,
  setTab,
} from "../../../redux/simulationData/phishingData/phishingDataSlice";
import {
  setDoneTutorial,
  setTutorialIdx,
} from "../../../redux/simulationData/phishingData/phishingDataSlice";
import {setCheckpoint} from "../../../redux/checkpoint/checkpointSlice";
import {GeneralButton} from "../../GeneralButton/GeneralButton";
import {store} from "../../../redux/store.js";
import {displayCompleteDateTime} from "../../../utilities/getCurrentDate";
import {setHintsTimeout} from "../../../redux/simulationData/phishingData/phishingDataSlice";

const InboxContentSubject = (props) => {
  return (
    <div className={styles["inbox-content-subject-container"]}>
      {props.subject}
    </div>
  );
};

// var Id = 1;
// const timeout = () =>{
//    clearTimeOut(Id)
//   Id = setTimeout( dispatch(setPrompt = true here))
// }

const InboxContentSender = ({
  sender,
  senderImg,
  senderEmail,
  receiver,
  inboxSelectedId,
  time,
}) => {
  const dispatch = useDispatch();
  const timeoutId = useSelector((state) => state.phishingData.hintsTimeout);
  const [style, setStyle] = useState({
    display: "none",
  });
  const [style2, setStyle2] = useState({
    display: "none",
  });

  function onClickImage() {
    setStyle({
      display: "inline",
      position: "absolute",
      bottom: "25px",
      right: "-150px",
      backgroundColor: "white",
      boxShadow: "0px 3px 3px grey",
      padding: "0 5px 0 5px",
      minWidth: "100px",
      maxWidth: "300px",
      fontSize: "12px",
      // minHeight: "10px",
      overflowWrap: "break-word",
      zIndex: "9999",
    });
  }
  function onClickName() {
    setStyle2({
      display: "inline",
      position: "absolute",
      bottom: "10px",
      right: "0px",
      backgroundColor: "white",
      boxShadow: "0px 3px 3px grey",
      padding: "0 5px 0 5px",
      minWidth: "100px",
      maxWidth: "300px",
      fontSize: "12px",
      // minHeight: "10px",
      overflowWrap: "break-word",
      zIndex: "9999",
    });
  }

  return (
    <div className={styles["inbox-content-sender-container"]}>
      <div className={styles["img-sender-receiver"]}>
        <div
          className={styles["sender-img-container"]}
          onMouseDown={() => {
            onClickImage();
            switch (inboxSelectedId) {
              case 3:
                dispatch(
                  setCheckpoint({checkpointName: "checkpoint1", status: true})
                );
                break;
              case 4:
                dispatch(
                  setCheckpoint({checkpointName: "checkpoint4", status: true})
                );
                break;
              case 6:
                dispatch(
                  setCheckpoint({checkpointName: "checkpoint8", status: true})
                );
                break;
              default:
                break;
            }
          }}
          onMouseLeave={() => setStyle({display: "none"})}
        >
          <img
            className={styles["sender-img"]}
            src={senderImg}
            alt="sender-img"
          />
          <div style={style}>
            {sender}
            <br />
            <InnerHref
              string={senderEmail}
              link={senderEmail}
              mailId={inboxSelectedId}
              email={true}
            />
          </div>
        </div>

        <div className={styles["sender-email-receiver-email"]}>
          <div
            className={styles["sender-email"]}
            onMouseDown={() => {
              onClickName();
              switch (inboxSelectedId) {
                case 3:
                  dispatch(
                    setCheckpoint({
                      checkpointName: "checkpoint1",
                      status: true,
                    })
                  );
                  break;
                case 4:
                  dispatch(
                    setCheckpoint({
                      checkpointName: "checkpoint4",
                      status: true,
                    })
                  );
                  break;
                case 6:
                  dispatch(
                    setCheckpoint({
                      checkpointName: "checkpoint8",
                      status: true,
                    })
                  );
                  break;
                default:
                  break;
              }
            }}
            onMouseLeave={() => setStyle2({display: "none"})}
          >
            {sender}
            <div style={style2}>
              {sender}
              <br />
              <InnerHref
                string={senderEmail}
                link={senderEmail}
                mailId={inboxSelectedId}
                email={true}
              />
            </div>
          </div>

          <div className={styles["receiver-email"]}>To : {receiver}</div>
        </div>
      </div>
      <InboxContentTime time={time} />
    </div>
  );
};

const InboxContentTime = (props) => {
  return (
    <div className={styles["inbox-content-time-container"]}>{props.time}</div>
  );
};

const InboxContentMessage = (props) => {
  const dispatch = useDispatch();
  const accountVerified = useSelector(
    (state) => state.phishingData.accountVerified
  );
  const checkpoint8Done = useSelector(
    (state) => state.phishingData.checkpoint8Done
  );
  const tabArr = useSelector((state) => state.phishingData.tabArr);
  const {inboxSelectedId} = props;

  function setVerified() {
    dispatch(setTutorialIdx(5));
    dispatch(setDoneTutorial(false));
    dispatch(setCheckpoint({checkpointName: "checkpoint5", status: false}));
  }

  function triggerYesOrNo() {
    dispatch(setDoneTutorial(false));
    dispatch(setTutorialIdx(6));
  }

  function addTab2ChangeStyle() {
    if (!tabArr.find((tab) => tab.tab_name === "Tab2")) {
      const tab2Obj = {
        tab_id: 2,
        tab_name: "Tab2",
        order: tabArr.length,
      };
      dispatch(setTab([...tabArr, tab2Obj]));
      dispatch(selectTab(tab2Obj.tab_name));
      dispatch(setCheckpoint({checkpointName: "checkpoint3", status: true}));
      console.log("is here triggered 2 1 ");
    } else {
      dispatch(selectTab("Tab2"));
      console.log("is here triggered 2 2 ");
    }
  }

  function addTab3ChangeStyle() {
    if (!tabArr.find((tab) => tab.tab_name === "Tab3")) {
      const tab3Obj = {
        tab_id: 3,
        tab_name: "Tab3",
        order: tabArr.length,
      };
      dispatch(setTab([...tabArr, tab3Obj]));
      dispatch(selectTab(tab3Obj.tab_name));
      dispatch(setCheckpoint({checkpointName: "checkpoint10", status: false}));
      console.log("is here triggered 3 1");
    } else {
      dispatch(selectTab("Tab3"));
      console.log("is here triggered 3 2");
    }
  }

  const linkSeparator = (string) => {
    const indicator = /(.*?)%%%%(.+?)%%%%(.*?)/;

    const match = string.match(indicator);
    if (match !== null) {
      return [match[1], match[2], match[3]];
    } else {
      return [string];
    }
  };

  const paragraphs = props.message.split("\n").map((string, index) => {
    const arr = linkSeparator(string);
    if (arr.length === 1) {
      return (
        <div key={index} style={{marginBottom: "0.5rem", fontSize: "13px"}}>
          {arr[0]}
        </div>
      );
    } else {
      // if(match[2] first 2 characters is VH then we use VerificationHRef )
      return (
        <div key={index} style={{marginBottom: "0.5rem", fontSize: "13px"}}>
          {arr[0]}
          {arr[1].substring(0, 2) !== "VH" ? (
            <InnerHref
              onClick={
                //note: added by 1 already
                inboxSelectedId === 3
                  ? addTab2ChangeStyle
                  : //note: added by 1 already
                  inboxSelectedId === 6
                  ? addTab3ChangeStyle
                  : null
              }
              string={arr[1]}
              link={
                //note: added by 1 already
                inboxSelectedId === 3
                  ? "https://www.google.com/imgres?imgurl=https%3A%2F%2Faddons.cdn.mozilla.net%2Fuser-media%2Fpreviews%2Ffull%2F65%2F65241.png%3Fmodified%3D1622132166"
                  : "http://www.dr0pbox.com/AAXLJj1zAA1zzsdAs22ez2eg"
              }
              mailId={inboxSelectedId}
            />
          ) : (
            <VerificationHref
              onClick={
                !accountVerified ? () => setVerified() : () => {} //Doesn't do anything once they've been phished once
              }
              string={arr[1].substring(2)}
              link="https://verifyyouraccount.com"
            />
          )}
          {arr[2]}
        </div>
      );
    }
  });
  return (
    <div>
      <div className={styles["inbox-content-message-container"]}>
        <div>
          {/* //note: added by 1 already */}
          {inboxSelectedId === 6 ? (
            <FaDropbox className={styles["dropbox-icon"]} />
          ) : null}
        </div>
        {paragraphs}
      </div>
      {props.forwardMessage ? (
        <>
          <hr />
          <div className={styles["forward-title-container"]}>
            <div className={styles["forward-title-content-container"]}>
              <b>From: </b>
              COMPANY_NAME@outlook.com
              <br />
              <b>Sent: </b>
              Thursday, September 30, 2021 2:27 PM
              <br />
              <b>To: </b>
              john@outlook.com
              <br />
              <b>Subject: </b>
              This is a test
            </div>
          </div>
          <hr />
          <div className={styles["forward-message-container"]}>
            <div style={{fontSize: "15px"}}>Title: Outlook Web App</div>
            <br />
            <div style={{fontSize: "14px"}}>
              <p>Dear John,</p>
              <p>Kindly validate your account details.</p>
              <p>
                Admin will not be held responsible for any problems encountered
                due to failure to perform below exercise.
              </p>
              <button
                type="button"
                className={styles["validate-btn"]}
                style={{cursor: "default"}}
              >
                Validate Account Here
              </button>
              <p>
                To opt out or change where you receive security notification.{" "}
                <u style={{color: "blue", cursor: "default"}}>Click here</u>
              </p>
              <p>Thanks,</p>
              <p style={{color: "red"}}>Out1ook Web Application Team</p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {props.forwardMessage ? (
        <>
          {" "}
          <hr />
          <div style={{marginTop: "10px", marginBottom: "10px"}}>
            {checkpoint8Done ? (
              <GeneralButton
                text="Reply to Jeff"
                buttonStyle="btn-greyout"
                buttonSize="btn-extra-small"
                // onClick={triggerYesOrNo}
                clickable={false}
              />
            ) : (
              <GeneralButton
                text="Reply to Jeff"
                buttonStyle="btn-plump-purple"
                buttonSize="btn-extra-small"
                onClick={triggerYesOrNo}
              />
            )}
          </div>{" "}
        </>
      ) : null}
    </div>
  );
};

const InboxContent = ({selectedInboxContent, contentHighlighted}) => {
  const userEmail = store.getState().user.userProfile.email;

  return (
    <div
      className={
        contentHighlighted === "inboxContent"
          ? `${styles["highlight-content"]} ${styles["pre-inbox-content-container"]}`
          : styles["pre-inbox-content-container"]
      }
    >
      {selectedInboxContent.map((mail) => (
        <div key={mail.email_id} className={styles["inbox-content-container"]}>
          <InboxContentSubject subject={mail.subject} />
          <InboxContentSender
            sender={mail.sender_name}
            senderEmail={mail.sender_email_addr}
            senderImg={mail.sender_img_base64}
            receiver={userEmail}
            inboxSelectedId={mail.email_id}
            time={displayCompleteDateTime(mail.received_time)}
          />
          <InboxContentMessage
            message={mail.message}
            forwardMessage={mail.is_forward_message}
            inboxSelectedId={mail.email_id}
          />
        </div>
      ))}
    </div>
  );
};

export default InboxContent;
