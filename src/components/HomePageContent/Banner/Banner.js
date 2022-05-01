import React from "react";
// import BannerImg from "./Banner.png";
import "./Banner.scss";

export default function Banner() {
  return (
    // <div className="HomePageBanner">
    //     <img className="BannerImg" src={BannerImg} />
    //     <div className="BannerTitleContainer">
    //         <h1 className="BannerTitle">CYBER SECURITY TRAINING DESCRIPTION</h1>
    //     </div>
    // </div>
    <div className="HomePageBanner">
      {/* <img src={BannerImg} className="BannerImg" alt="Banner" /> */}
      <h1 className="HomePageBannerTitle">CYBER SECURITY TRAINING</h1>
      <h2 className="HomePageBannerSubtitle">DESCRIPTION</h2>
    </div>
  );
}
