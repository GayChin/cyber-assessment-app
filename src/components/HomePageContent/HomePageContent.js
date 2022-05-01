import React from "react";
import Banner from "./Banner/Banner";
import Description from "./Description/Description";
// import Line from "./Line/Line";
// import * as homeStyle from "./HomePageContent.module.scss";
import Placeholder1 from "./Placeholder1.png";
import Placeholder2 from "./Placeholder2.png";
import Footer from "../Footer/Footer";
import "./HomePageContent.scss";

export default function HomePageContent() {
  return (
    <div className="HomepageContainer">
      <Banner />
      <div className="center-homepage-content">
        <Description direction="DescRight" src={Placeholder1}>
          <h1>Up your resilience level in cybersecurity</h1>
          <ul>
            <li>
              Learn by following a structured pathway or guide your own learning
            </li>
            <li>Lots of simulations to test your resilience level</li>
            <li>Upskill your cybersecurity knowledge and protect yourself</li>
          </ul>
        </Description>

        <Description direction="DescLeft" src={Placeholder2}>
          <h1>Learn, Practice and Complete</h1>
          <p>
            Learn by following a structured pathway or guide your own learning.
            Start your own private hackable machines (no sharing) and use your
            skills in a real-world environment by completing guided,
            objective-based tasks.
          </p>
        </Description>
        {/* <h1 className={homeStyle.test}>Hello</h1> */}
        <Footer />
      </div>
    </div>
  );
}
