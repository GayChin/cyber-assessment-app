import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import styles from "./Phishing.module.scss";
import {GeneralButton} from "../../GeneralButton/GeneralButton";
import {FaDropbox} from "react-icons/fa";
import {setCheckpoint} from "../../../redux/checkpoint/checkpointSlice";
import {
  setDoneTutorial,
  setTutorialIdx,
  setLastReminder,
} from "../../../redux/simulationData/phishingData/phishingDataSlice";
import dropbox from "./src/dropbox.gif";

const Tab3Content = () => {
  const dispatch = useDispatch();
  const emailValidator = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const checkpoint12 = useSelector(
    (state) => state.checkpoint.checkpoints.checkpoint12
  );

  const lastReminder = useSelector((state) => state.phishingData.lastReminder);

  const tutorialId = useSelector((state) => state.phishingData.tutorialIdx);
  function setCheckpoint12() {
    setButtonClicked(true);
    if (emailValidator.test(email) && password) {
      console.log("users leaked their data");
      // Return to the dropbox homepage
      setSubmitted(true);
      dispatch(setCheckpoint({checkpointName: "checkpoint12", status: false}));
    } else if (!email || !password) {
      setErrorText(
        "Fields highlighted cannot be left empty, please try again."
      );
    } else if (!emailValidator.test(email)) {
      setErrorText("Incorrect email format! Please try again.");
    }

    if (tutorialId !== 7 && !lastReminder) {
      console.log("tutorial id ", tutorialId);
      setTimeout(() => {
        dispatch(setTutorialIdx(7));
        dispatch(setDoneTutorial(false));
      }, 1500);
    }
  }

  return (
    <div className={styles["dropbox-main-container"]}>
      {submitted || !checkpoint12 ? (
        <>
          <div className={styles["dropbox-header"]}>
            <FaDropbox
              style={{marginRight: "10px"}}
              className={styles["dropbox-icon"]}
            />
            <span style={{paddingBottom: "15px"}}>Dr0pbox</span>
            <hr />
          </div>
          <h1>Welcome to Dr0pbox!</h1>
          <h3>Keep life organized and work moving—all in one place</h3>
          <br />
          <button className={styles["dropbox-btn"]}>
            Find the plan for you
          </button>
          <br />
          <div className={styles["dropbox-ads"]}>
            <div className={styles["dropbox-ads-left"]}>
              <div>
                Dropbox gives you secure access to all your files. Collaborate
                with friends, family, and coworkers from any device.
              </div>
            </div>
            <div className={styles["dropbox-ads-right"]}>
              <img src={dropbox} alt="" />
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className={styles["dropbox-header"]}>
            <FaDropbox
              style={{marginRight: "10px"}}
              className={styles["dropbox-icon"]}
            />
            <span style={{paddingBottom: "15px"}}>Dr0pbox</span>
            <hr />
          </div>
          <div className={styles["dropbox-content"]}>
            <div className={styles["dropbox-caption"]}>
              <div>
                John wants to share the folder{" "}
                <b>Ways to become better at work</b> with you.
              </div>
              <div
                style={{color: "grey", fontSize: "20px", marginBottom: "5px"}}
              >
                Sign in to view files in this folder
              </div>
            </div>
            <div>
              <label>
                Enter your email address:
                <div>
                  <input
                    className={
                      buttonClicked && (!email || !emailValidator.test(email))
                        ? styles["formErrorInput"]
                        : styles["formInput"]
                    }
                    value={email}
                    type="text"
                    name="email"
                    placeholder="abc@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </label>
            </div>
            <div>
              <label>
                Enter your password:
                <div>
                  <input
                    className={
                      buttonClicked && !password
                        ? styles["formErrorInput"]
                        : styles["formInput"]
                    }
                    value={password}
                    type="password"
                    name="newPassword"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </label>
            </div>
            <div
              className={
                errorText
                  ? styles["display-password-error"]
                  : styles["hide-password-error"]
              }
            >
              {errorText}
            </div>
            <div className={styles["dropbox-submit"]}>
              <GeneralButton
                text="Submit"
                buttonStyle="btn-dropbox-blue"
                buttonSize="btn-small"
                onClick={setCheckpoint12}
              />
            </div>
          </div>
        </div>
      )}
      <div className={styles["dropbox-footer"]}></div>
    </div>
  );
};

export default Tab3Content;
