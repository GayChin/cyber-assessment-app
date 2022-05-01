import React, {useState, useEffect} from "react";
import {store} from "../../redux/store";
import CloseMenu from "../../images/close.svg";
import MenuIcon from "../../images/menu.svg";
import Logo from "../../images/logo.svg";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import LoginPrompt from "../LoginPrompt/LoginPrompt";
import styles from "./Navbar.module.scss";

import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../services/api/auth.js";
import {userLogout, setUserProfilePic} from "../../redux/user/userSlice";
// import storage from "redux-persist/lib/storage";
// import {persistor} from "../../redux/store";
import {setLoginPrompt, setTourIdx} from "../../redux/general/generalSlice";
import {ImExit} from "react-icons/im";
import {MdChromeReaderMode} from "react-icons/md";
import {FaChevronRight} from "react-icons/fa";
import {RiLoginBoxFill, RiDashboardFill} from "react-icons/ri";
import {upsertSimulationRecord} from "../../services/api/simulationRecord";
import {getProfileImage} from "../../services/api/profileImage";
import {upsertModuleRecord} from "../../services/api/moduleRecord";
import ProfileImage from "../../images/profilepic.jpg";
// import {setSimulationIsLoading} from "../../redux/simulations/simulationsSlice";
import {upsertSimulationPhishing} from "../../services/api/simulationPhishing";
import moment from "moment-timezone";
import Toast from "../Toast/Toast";


const Navbar = () => {
  var tz = moment.tz.guess();
  console.log(tz);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const loginPrompt = useSelector((state) => state.general.loginPrompt);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const user = useSelector((state) => state.user.user);
  const firstName = useSelector((state) => state.user.userProfile.first_name);
  const reduxProfileImg = useSelector((state) => state.user.userProfilePic);
  const userInfo = store.getState().user.userProfile;
  const currentEmail = userInfo.email;
  const simulationName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const displayToast = useSelector((state) => state.general.displayToast);
  //const simulationList = useSelector((state) => state.simulations.simulationList);
  const checkpoints = useSelector((state) => state.checkpoint.checkpoints);

  const upsert = async () => {
    const simulationList = store.getState().simulations.simulationList;
    console.log("Upserting for simulation while logging out");
    const simulationId = simulationList.filter((simulation) => {
      return simulation.simulation_url === simulationName;
    })[0].simulation_id;
    // general upsert for all simulations
    await upsertSimulationRecord(simulationId, simulationName, checkpoints);
    console.log("if simulationId === 1 then upsert, else here got problem ", simulationId);
    if (simulationList && simulationList.length !== 0 && simulationId === 1 ) {
      await upsertSimulationPhishing();
    }
  };

  const logoutUser = async (refreshToken) => {
    //if is in simulation
    if (location.pathname.indexOf("simulation") !== -1) {
      //note: upsert when logout
      await upsertModuleRecord();
      await upsert(); // ENABLEBACK
    }
    await logout(refreshToken);
    dispatch(userLogout());
    history.push("/");
    // dispatch(clearData());
    // persistor.purge();
    // persistor.pause();
  };
  useEffect(() => {
    async function profilePicGetter() {
      const retrievedProfileImage = await getProfileImage(currentEmail);
      if (retrievedProfileImage && retrievedProfileImage.length > 25) {
        dispatch(
          setUserProfilePic(retrievedProfileImage.profile_picture_base64)
        );
      }
    }
    if (currentEmail) {
      profilePicGetter();
    }
  }, []);

  return (
    <>
      <div className={styles["navbar"]}>
        <div className={styles["logo-nav"]}>
          <div className={styles["logo-container"]}>
            <NavLink to="/">
              <img className={styles["logo"]} src={Logo} alt="logo" />
            </NavLink>
          </div>
          {/* Login button only display in Mobile View */}
          <ul
            className={
              click
                ? user
                  ? `${styles["nav-options-login"]} ${styles["active"]}`
                  : `${styles["nav-options"]} ${styles["active"]}`
                : styles["nav-options"]
            }
          >
            {user ? (
              <li
                className={`${styles["option"]} ${styles["mobile-option"]}`}
                onClick={closeMobileMenu}
              >
                <NavLink to="/profile" className={styles["nav-link-2"]}>
                  <div className={styles["login-btn-with-name-container"]}>
                    <img
                      src={reduxProfileImg}
                      className={styles["profile-img"]}
                      alt="profile-img"
                    ></img>
                    <div className={styles["login-btn-name"]}>{firstName}</div>
                  </div>
                </NavLink>
              </li>
            ) : null}

            <li className={styles["option"]} onClick={closeMobileMenu}>
              
              <NavLink to="/modules" onClick={()=>{dispatch(setTourIdx(2))}} className={styles["nav-link"]}>
                <div className={styles["flex-row"]}>
                  <div className={styles["icon-desc-container"]}>
                    <MdChromeReaderMode
                      className={`${styles["mobile-option"]} ${styles["icon-size"]}`}
                    />
                    <span id="nav-modules">Modules</span>
                  </div>
                  <div className={styles["mobile-option"]}>
                    <FaChevronRight />
                  </div>
                </div>
              </NavLink>
            </li>
            {user ? (
              <li id="nav-dashboard" className={styles["option"]} onClick={closeMobileMenu}>
                <NavLink to="/dashboard" className={styles["nav-link"]}>
                  <div className={styles["flex-row"]}>
                    <div className={styles["icon-desc-container"]}>
                      <RiDashboardFill
                        className={`${styles["mobile-option"]} ${styles["icon-dashboard-size"]}`}
                      />
                      <span id="nav-db">Dashboard</span>
                    </div>
                    <div className={styles["mobile-option"]}>
                      <FaChevronRight />
                    </div>
                  </div>
                </NavLink>
              </li>
            ) : null}
            <li
              className={`${styles["option"]} ${styles["mobile-option"]}`}
              onClick={closeMobileMenu}
            >
              {user ? (
                <div
                  className={styles["nav-link"]}
                  onClick={() => logoutUser(user.refresh_token)}
                >
                  <div className={styles["flex-row"]}>
                    <div className={styles["icon-desc-container"]}>
                      <ImExit className={styles["icon-size"]} />
                      <span>Log Out</span>
                    </div>
                    <div className={styles["mobile-option"]}>
                      <FaChevronRight />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={styles["nav-link"]}
                  onClick={() => dispatch(setLoginPrompt(!loginPrompt))}
                >
                  <div className={styles["flex-row"]}>
                    <div className={styles["icon-desc-container"]}>
                      <RiLoginBoxFill className={styles["icon-size"]} />
                      <span>Log In</span>
                    </div>
                    <div className={styles["mobile-option"]}>
                      <FaChevronRight />
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
        {/* Login button in desktop view */}
        <ul className={styles["login-desktop"]}>
          <li onClick={closeMobileMenu}>
            {user ? (
              <div className={styles["login-btn-with-name-container"]}>
                <button
                  className={styles["login-btn"]}
                  onClick={() => logoutUser(user.refresh_token)}
                >
                  Log Out
                </button>
                <div className={styles["vertical-line"]} />
                <NavLink to="/profile" className={styles["nav-link-2"]}>
                  <div className={styles["flex-row-desktop"]}>
                    <img
                      src={reduxProfileImg}
                      className={styles["profile-img"]}
                      alt="profile-img"
                    ></img>
                    <div className={styles["login-btn-name"]}>{firstName}</div>
                  </div>
                </NavLink>
              </div>
            ) : (
              <button
                className={styles["login-btn"]}
                onClick={() => dispatch(setLoginPrompt(!loginPrompt))}
              >
                Log In
              </button>
            )}
          </li>
        </ul>
        <div className={styles["mobile-menu"]} onClick={handleClick}>
          {click ? (
            <div className={styles["menu-container"]}>
              <img
                className={styles["menu-icon"]}
                src={CloseMenu}
                alt="Close Menu"
              />
            </div>
          ) : (
            <div className={styles["menu-container"]}>
              <img
                className={styles["menu-icon"]}
                src={MenuIcon}
                alt="Open Menu"
              />
            </div>
          )}
        </div>
      </div>
      {loginPrompt && (
        <div className={styles["overlay"]}>
          <LoginPrompt loginPrompt={loginPrompt} history={history} />
        </div>
      )}
      {/* When setting displayToast = true in redux, we also need to set the message at the same time to avoid race condition */}
      {displayToast && (
        <Toast />
      )}

    </>
  );
};

export default Navbar;
  /* <Toast className={toast ? `${toastStyles["toastBar"]} ${toastStyles["toastBarShow"]}` : toastStyles["toastBar"]}/> */