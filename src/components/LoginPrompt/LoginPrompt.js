import React from "react";
import { connect } from "react-redux";
import { Form, Button, Spinner } from "react-bootstrap";
import onClickOutside from "react-onclickoutside";
import LoginPromptError from "../LoginPromptError/LoginPromptError";
import logo from "./drsbx-logo.jpg";
import trademark from "./drsbx-trademark.svg";
import { store } from "../../redux/store";

//set timeout for the whole app, calculate the remaining session time, when timeout, delete cookie and redirect
import styles from "./LoginPrompt.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  setUserData,
  setUserProfileData,
  setUserProfilePic,
  // toggleRememberUser,
} from "../../redux/user/userSlice";
import { setLoginPrompt } from "../../redux/general/generalSlice";
import { login } from "../../services/api/auth.js";
import { getUserProfile } from "../../services/api/userProfile.js";
import {
  setTab,
  selectTab,
  setAllTab,
  setInboxArr,
  setInboxTimedArr,
  setDoingTutorial,
  setDoneTutorial,
  setTutorialIdx,
  setInboxNewestId,
  setAccountVerified,
  setSelectedBeforeTab2,
  setCheckpoint8Done,
  setNextInboxAppearanceTiming,
  selectInbox,
  setBookmarkedContent,
  setMarkedAsReadContent,
  setReportPhishingList,
  setSelectedBeforeInboxList,
} from "../../redux/simulationData/phishingData/phishingDataSlice";
import {
  setSimulations,
  setSimulationIsLoading,
  setSidebarIsLoading,
} from "../../redux/simulations/simulationsSlice";
import { setSimulationCompletionStatus, setStarted, setIsTimerRunning } from "../../redux/timer/timerSlice";
import { setCurrentModule } from "../../redux/module/moduleSlice";
// TESTING THE PHISHING TAB API
// import { getSimulationPhishingTab } from "../../services/api/simulationPhishingTab";
import { getSimulationPhishing } from "../../services/api/simulationPhishing";
import { getModuleRecord } from "../../services/api/moduleRecord";
import { reportTemplateItem } from "../../constant/reportTemplateItem";
import { fetchPhishingSimulation } from "../../services/simulation-fetcher/phishing";


class LoginPrompt extends React.Component {
  constructor() {
    super();
    this.state = {
      credentials: { email: "", password: "" },
      isLoading: false,
      netwkError: false,
      forgotpassword: false,
      requested: false,
      msg: "",
      onSwitch: false,
    };
    this.onLogin = this.onLogin.bind(this);
  }

  async onLogin(event) {
    this.setState({
      netwkError: false,
      msg: "",
    });
    event.preventDefault();
    this.setState({
      isLoading: true,
    });

    const data = await login(JSON.stringify(this.state.credentials));

    if (data) {
      this.props.setUserData(data);
      const accountData = await getUserProfile(this.state.credentials.email);

      if (accountData) {
        this.props.setUserProfileData(accountData[0]);
        console.log("user data is set!")

        if (accountData[0].profile_picture_base64 && accountData[0].profile_picture_base64.length > 25) {
          this.props.setUserProfilePic(accountData[0].profile_picture_base64);
        }

        this.setState({
          isLoading: false,
        });
        this.props.setLoginPrompt(false);

        //note: fetch simulation progress from backend when is_first_time is true
        if (accountData[0].is_first_time === true) {
          this.props.history.push("modules/1/simulation/phishing");
          //note: set timer and set completion status

          // let response = await getSimulationPhishingTab();
          this.props.setSidebarIsLoading(true);
          this.props.setSimulationIsLoading(true);
          const [moduleRecordData, allData] = await Promise.all([
            getModuleRecord(1),
            getSimulationPhishing(),
          ]);

          if (moduleRecordData) {
            console.log("enter?")
            this.props.setSimulations(moduleRecordData[0].simulation_statuses);
            console.log("AFDEEE?", store.getState().simulations.simulationList);
            this.props.setCurrentModule(moduleRecordData[0].module_id);
            this.props.setIsTimerRunning(moduleRecordData[0].is_timer_running);
            this.props.setStarted(moduleRecordData[0].is_started);
            for (let i = 0; i < moduleRecordData[0].simulation_statuses.length; i++) {
              this.props.setSimulationCompletionStatus({
                simulationName:
                  moduleRecordData[0].simulation_statuses[i].simulation_url,
                status: moduleRecordData[0].simulation_statuses[i].is_completed,
              });
            }
          }

          let emptyTabArr = [];

          // Once received all the progress information, we will update it to the redux
          if (allData) {
            console.log(allData[0].opening_tabs);

            //inboxArr
            this.props.setInboxArr(allData[0].inbox);

            //inboxTimedArr
            const timedInboxIds = [];
            const timedInboxes = allData[0].timed_inbox;

            //note: when users first login we have to append current time to the obj
            /*
            {
              "received_time": "Wed 12:04PM",
              "email_id": 1
            }
            */
            //contain all timedInbox.email_id
            timedInboxes.forEach((timedInbox) => {
              timedInboxIds.push(timedInbox.email_id);
            });

            // Filter the array and update the timedInboxArr
            // e.g time inbox has email id 1 - 3
            const filteredInboxArr = allData[0].inbox.filter((inbox) => {
              return timedInboxIds.includes(inbox.email_id);
            });

            //gay idea
            const finalizedTimedArr = []
            for (let i = 0; i < timedInboxes.length; i++) {
              let inboxObj = {}
              if (timedInboxes[i].email_id > 6) {
                //append report template here
                inboxObj = reportTemplateItem(timedInboxes[i].email_id)
              } else {
                for (let j = 0; j < allData[0].inbox.length; j++) {
                  if (timedInboxes[i].email_id === allData[0].inbox[j].email_id) {
                    //append 
                    if (timedInboxes[i].received_time === 0) {
                      timedInboxes[i].received_time = Math.trunc(Date.now() / 1000);
                    }
                    inboxObj = { ...timedInboxes[i], ...allData[0].inbox[j] }
                  }
                }
              }
              finalizedTimedArr.push(inboxObj)
            }

            console.log("filtered inbox arr :", finalizedTimedArr);
            this.props.setInboxTimedArr(finalizedTimedArr);
            //phishing tab
            const allTabs = allData[0].all_tabs;
            this.props.setAllTab(allTabs);

            allData[0].opening_tabs.forEach((tab) => {
              const currentTabName = allTabs.filter((singleTab) => {
                return singleTab.tab_id === tab.tab_id;
              })[0].tab_name;

              tab["tab_name"] = currentTabName;
              emptyTabArr.push(tab);
            });

            if (emptyTabArr) {
              console.log("emptyTabArr : ", emptyTabArr);
              // Sort by order here
              emptyTabArr.sort((a, b) => a.order - b.order)
              console.log("empty tab arr", emptyTabArr)
              this.props.setTab(emptyTabArr);

            }

            // Setting the focusing tab id
            const focusTab = allTabs.filter((singleTab) => {
              return singleTab.tab_id === allData[0].focusing_tab_id;
            })[0].tab_name;
            console.log("focusTab :", focusTab)
            this.props.selectTab(focusTab);

            //doneTutorial
            this.props.setDoneTutorial(allData[0].has_done_tutorial);

            //doingTutorial
            this.props.setDoingTutorial(allData[0].is_doing_tutorial);

            //tutorialIdx
            this.props.setTutorialIdx(allData[0].tutorial_idx);

            //reported email newest id
            this.props.setInboxNewestId(allData[0].reported_email_newest_id);

            //account verified
            this.props.setAccountVerified(allData[0].is_account_verified);

            //tab 2 selected before
            this.props.setSelectedBeforeTab2(
              allData[0].is_tab_2_selected_before
            );

            //checkpoint 8 done
            this.props.setCheckpoint8Done(allData[0].is_checkpoint8_done);

            //next email appear timing
            this.props.setNextInboxAppearanceTiming(
              allData[0].next_email_appear_timing
            );

            //inbox selected
            this.props.selectInbox(allData[0].focusing_email_id);

            //bookmarked email ids
            this.props.setBookmarkedContent(allData[0].bookmarked_email_ids);

            //marked as read email ids
            this.props.setMarkedAsReadContent(
              allData[0].marked_as_read_email_ids
            );

            //reported email ids
            this.props.setReportPhishingList(
              allData[0].reported_phish_email_ids
            );

            //selected email ids
            this.props.setSelectedBeforeInboxList(
              allData[0].selected_email_ids
            );
          }
          this.props.setSidebarIsLoading(false);
        }else{
          window.location.reload();
        }
      }
    } else {
      this.setState({
        netwkError: true,
        msg: "Invalid Email or Password",
        isLoading: false,
      });
    }
  }

  inputChanged = (event) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [event.target.name]: event.target.value,
      },
    });
  };

  forgetPwLayout = (event) => {
    this.setState({ forgotpassword: true });
  };

  sendEmail = (event) => {
    // send to backend if submitted change the state
    this.setState({ forgotpassword: false, requested: true });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.netwkError != this.state.netwkError) {
  //     this.setState({
  //       ...prevState,
  //       netwkError = false
  //     })
  //   }
  // }

  onSwitch = (event) => {
    this.setState({ onSwitch: !this.state.onSwitch });
  };

  render() {
    LoginPrompt.handleClickOutside = () => this.props.setLoginPrompt(false);
    console.log("state requested : ", this.state.requested);

    if (!this.state.forgotpassword && !this.state.requested) {
      return (
        // <div className="overlay">
        <div className={styles.loginPrompt}>
          <div style={{ margin: "20px 0 20px 0" }} align="center">
            <img className={styles.logosize} src={logo} alt="DRSBX Logo" />
          </div>
          <LoginPromptError msg={this.state.msg} />
          <Form
            style={{ width: "80%", marginLeft: "10%" }}
            onSubmit={this.onLogin}
          >
            <Form.Group>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                value={this.state.credentials.email}
                onChange={this.inputChanged}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.credentials.password}
                onChange={this.inputChanged}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="switch"
                id="KeepMeSignedInSwitch"
                label="Keep me signed in"
                value={false}
                onChange={this.onSwitch}
              />
            </Form.Group>
            {this.state.isLoading || (
              <div align="center">
                <Button
                  onClick={this.onLogin}
                  className={styles.submitBtn}
                  type="submit"
                  style={{ fontWeight: "bold" }}
                // id="login"
                >
                  Log in
                </Button>
              </div>
            )}
            {this.state.isLoading && (
              <div align="center">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>{" "}
                  {/*This part is for accessibility */}
                </Spinner>
              </div>
            )}
          </Form>
          <div align="center">
            <p align="left" style={{ marginLeft: "10%", marginBottom: "10%" }}>
              <button
                className={styles.forgotPasswordBtn}
                type="button"
                onClick={this.forgetPwLayout}
              >
                Forgot password?
              </button>
            </p>
            <img className={styles.tm} src={trademark} alt="DR Trademark" />
          </div>
          <p></p>
          {/* {firstTime ? <Redirect to="/quiz" /> : null} */}
        </div>
      );
    } else if (this.state.forgotpassword) {
      return (
        <div className={styles.loginPrompt}>
          <div style={{ margin: "20px 0 20px 0" }} align="center">
            <img className={styles.logosize} src={logo} alt="DRSBX Logo" />
          </div>
          <h4>Password Reset</h4>
          <Form
            style={{ width: "80%", margin: "8% 0 5% 10%" }}
          // Change here
          // onSubmit={this.sendEmail}
          >
            <Form.Group>
              <Form.Label>Enter your email used for DRSBX</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
              // value={this.state.credentials.email}
              />
            </Form.Group>
            <div align="center">
              <Button
                className={styles.submitBtn}
                type="button"
                style={{ fontWeight: "bold" }}
                onClick={this.sendEmail}
              >
                Reset Password
              </Button>
            </div>
            <div align="center" style={{ paddingTop: "61px" }}>
              <img className={styles.tm} src={trademark} alt="DR Trademark" />
            </div>
          </Form>
        </div>
      );
    } else if (this.state.requested) {
      return (
        <div className={styles.loginPrompt}>
          <div style={{ margin: "20px 0 20px 0" }} align="center">
            <img className={styles.logosize} src={logo} alt="DRSBX Logo" />
          </div>
          <h4>Password Reset</h4>
          <div align="center" style={{ width: "80%", margin: "8% 0 5% 10%" }}>
            <h6>
              An email with the password reset link has been sent to your
              personal email address. It may take up to a few minutes before you
              see it in your inbox.
            </h6>
          </div>
          <div align="center" style={{ width: "80%", margin: "8% 0 5% 10%" }}>
            <Button
              className={styles.submitBtn}
              type="button"
              style={{ fontWeight: "bold" }}
              onClick={LoginPrompt.handleClickOutside}
            >
              Got it
            </Button>
          </div>
          <div align="center" style={{ paddingTop: "10px" }}>
            <img className={styles.tm} src={trademark} alt="DR Trademark" />
          </div>
        </div>
      );
    }
  }
}

const clickOutsideConfig = {
  handleClickOutside: () => LoginPrompt.handleClickOutside,
};

// }

const mapDispatchToProps = {
  setUserData,
  setLoginPrompt,
  setSimulations,
  setUserProfileData,
  setUserProfilePic,
  setInboxArr,
  setInboxTimedArr,
  setTab,
  setAllTab,
  selectTab,
  setDoneTutorial,
  setDoingTutorial,
  setTutorialIdx,
  setInboxNewestId,
  setAccountVerified,
  setSelectedBeforeTab2,
  setCheckpoint8Done,
  setNextInboxAppearanceTiming,
  selectInbox,
  setBookmarkedContent,
  setMarkedAsReadContent,
  setReportPhishingList,
  setSelectedBeforeInboxList,
  setSimulationIsLoading,
  setSidebarIsLoading,
  setCurrentModule,
  setIsTimerRunning,
  setStarted,
  setSimulationCompletionStatus,
};

// Need to call connect() down here
export default connect(
  null,
  mapDispatchToProps
)(onClickOutside(LoginPrompt, clickOutsideConfig));
