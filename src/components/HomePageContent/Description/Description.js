import React from "react";
import "./Description.scss";

export default function Description(props) {
  return (
    <div className={`Description ${props.direction}`}>
      {/* direction is either "DescLeft" or "DescRight"*/}
      <img src={props.src} alt="Background_Image" />
      <div className={`Text ${props.direction}`}>
        <div className="text-children">{props.children}</div>
      </div>
    </div>
  );
}
