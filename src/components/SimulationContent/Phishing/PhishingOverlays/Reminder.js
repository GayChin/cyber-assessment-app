import React, {useEffect} from "react";
import TutorialWindow from "../../../TutorialWindow/TutorialWindow";
import {useSelector} from "react-redux";

const Reminder = (props) => {
  const inboxTimedArr = useSelector(
    (state) => state.phishingData.inboxTimedArr
  );
  const markedAsReadList = useSelector(
    (state) => state.phishingData.markedAsReadList
  );
  const reportedPhishList = useSelector(
    (state) => state.phishingData.reportedPhishList
  );
  const accountVerified = useSelector(
    (state) => state.phishingData.accountVerified
  );

  const lastReminder = useSelector((state) => state.phishingData.lastReminder);

  const email6 = inboxTimedArr.find((inbox) => inbox.email_id === 6);
  const email6Reported = reportedPhishList.find((inbox) => inbox === 6);
  console.log("account Verified : ", accountVerified);

  useEffect(() => {
    console.log("marked as read length : ", markedAsReadList.length);
  }, [markedAsReadList]);

  return (
    <>
      {inboxTimedArr.length === markedAsReadList.length ? (
        (email6Reported || email6) && !lastReminder ? (
          <TutorialWindow
            position="center"
            type="phishing"
            title="Reminder - Phishing Simulation"
            message="You have reached the last checkpoint of the simulation, click the submit button if you think you have done the simulation correctly."
            noPrevious={true}
            next="submit"
            nextMsg="Ok"
          />
        ) : (
          <TutorialWindow
            position="center"
            index={props.index}
            type="hint"
            title="Reminder - Phishing Simulation"
            message={"Did you finish reading the email?"}
            previous={props.previous}
            next={props.next}
            prevMsg="Yes"
            nextMsg="No"
          />
        )
      ) : (
        <TutorialWindow
          position="center"
          index={props.index}
          type="hint"
          title="Reminder - Phishing Simulation"
          message={"There are unread emails, please check them out"}
          noPrevious={true}
          next={props.next}
          nextMsg="Ok"
        />
      )}
    </>
  );
};

export default Reminder;
