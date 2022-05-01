import React, {useEffect} from "react";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Homepage.js";
import Modules from "./pages/Modules.js";
import Dashboard from "./pages/Dashboard";
import Simulation from "./pages/Simulation";
import {useSelector} from "react-redux";
import {
  // BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useLocation,
} from "react-router-dom";
import Error from "./pages/Error";
import Activities from "./pages/Activities";
import SingleActivity from "./pages/SingleActivity";
import Profile from "./pages/Profile";
import TourOverlay from "./components/TourOverlays/TourOverlay";
import Tour1 from "./components/TourOverlays/Tour1";
import Tour2 from "./components/TourOverlays/Tour2";
import Tour3 from "./components/TourOverlays/Tour3";
import Tour4 from "./components/TourOverlays/Tour4";
import Tour5 from "./components/TourOverlays/Tour5";
import Tour6 from "./components/TourOverlays/Tour6";
import Tour7 from "./components/TourOverlays/Tour7";
import Tour8 from "./components/TourOverlays/Tour8";
import Tour9 from "./components/TourOverlays/Tour9";
import Tour10 from "./components/TourOverlays/Tour10";
import Tour11 from "./components/TourOverlays/Tour11";
import Tour12 from "./components/TourOverlays/Tour12";
import Tour13 from "./components/TourOverlays/Tour13";
import Tour14 from "./components/TourOverlays/Tour14";
import Tour15 from "./components/TourOverlays/Tour15";
import Tour16 from "./components/TourOverlays/Tour16";
import Tour17 from "./components/TourOverlays/Tour17";
import Tour18 from "./components/TourOverlays/Tour18";
import Tour19 from "./components/TourOverlays/Tour19";
import Tour20 from "./components/TourOverlays/Tour20";
import DummyActivityPage from "./pages/TourDummyPages/DummyActivityPage";
import DummyModules from "./pages/TourDummyPages/DummyModules";
import DummySingleActivityPage from "./pages/TourDummyPages/DummySingleActivity";
import DummyDashboard from "./pages/TourDummyPages/DummyDashboard";

// function setLoginPrompt(){
//   store.dispatch(generalSlice.actions.setLoginPrompt(true))
// }

function PrivateRoute({component: Component, authenticated, ...rest}) {
  //As long as userData exists, we can assume they are authenticated

  //Private routes should redirect to an error page unless authenticated
  //And the button to access the private routes should not access before being authenticated

  return (
    <Route
      {...rest}
      render={
        (props) =>
          // authenticated ? <Component {...props} /> : null
          authenticated ? <Component {...props} /> : <Redirect to="/" /> //Doing this ensures that users who saved the url can no longer enter an empty page
      }
    />
  );
}

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route

    <Route
      {...rest}
      render={(props) =>
        restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

function App() {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const isTourRunning = useSelector((state) => state.general.isTourRunning);
  const tourIdx = useSelector((state) => state.general.tourIdx);
  console.log("is tour running", isTourRunning);

  const tours = [
    <Tour1 key="0" next="next" />,
    <Tour2 key="1" />,

    //module
    <Tour3 key="2" next="next" />,
    <Tour4 key="3" next="next" />,
    <Tour5 key="4" next="next" />,
    <Tour6 key="5" />,

    //activity list
    <Tour7 key="6" next="next" />,
    <Tour8 key="7" next="next" />,
    <Tour9 key="8" next="next" />,
    <Tour10 key="9" />,

    // //single activity
    <Tour11 key="10" next="next" />,
    <Tour12 key="11" next="next" />,
    <Tour13 key="12" next="next" />,
    <Tour14 key="13" next="next" />,
    <Tour15 key="14" />,
    <Tour16 key="15" next="next" />,
    <Tour17 key="16" next="next" />,
    <Tour18 key="17" next="next" />,
    <Tour19 key="18" next="next" />,
    <Tour20 key="19" next="finalNext" />,
  ];

  useEffect(() => {}, [location]);
  return (
    <div>
      {isTourRunning ? (
        <>
          <TourOverlay />
          {tours[tourIdx]}
        </>
      ) : null}
      <Navbar />
      <Switch>
        <PublicRoute restricted={false} component={HomePage} path="/" exact />
        {/* <PublicRoute restricted={false} component={Timer} path="/timer" exact /> */}
        <PublicRoute
          restricted={false}
          component={isTourRunning ? DummyModules : Modules}
          path="/modules"
          exact
        />
        <PublicRoute
          restricted={false}
          component={isTourRunning ? DummyActivityPage : Activities}
          path="/modules/:moduleId/"
          exact
        />
        <PublicRoute
          restricted={false}
          component={isTourRunning ? DummySingleActivityPage : SingleActivity}
          path="/modules/:moduleId/activities/:activityId/"
          exact
        />
        <PrivateRoute
          restricted={false}
          authenticated={user}
          component={isTourRunning ? DummyDashboard : Dashboard}
          path="/dashboard"
          exact
        />
        <PrivateRoute
          restricted={false}
          component={() => <Simulation type="phishing" />}
          authenticated={user}
          path="/modules/:moduleId/simulation/phishing"
          exact
        />
        <PrivateRoute
          restricted={false}
          component={Simulation}
          authenticated={user}
          path="/modules/:moduleId/simulation/password"
          exact
        />

        <PrivateRoute
          restricted={false}
          component={Simulation}
          authenticated={user}
          path="/modules/:moduleId/simulation/sim3"
          exact
        />
        <PrivateRoute
          restricted={false}
          component={Simulation}
          authenticated={user}
          path="/modules/:moduleId/simulation/sim4"
          exact
        />
        <PrivateRoute
          restricted={false}
          component={Profile}
          authenticated={user}
          path="/profile"
          exact
        />
        <PublicRoute restricted={false} component={Error} path="*" />
      </Switch>
    </div>
  );
}

export default App;
