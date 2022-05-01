import React from "react";
import styles from "./GeneralButton.module.scss";

const STYLES = [
  "btn-plump-purple",
  "btn-medium-state-blue",
  "btn-white",
  "btn-greyout",
  "btn-dropbox-blue"
];

const SIZES = ["btn-medium", "btn-small", "btn-extra-small"];

const RADIUS = [
  "btn-less-slightly-rounded",
  "btn-slightly-rounded",
  "btn-rounded",
];

export const GeneralButton = ({
  text,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonRadius,
  clickable,
  id,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const checkButtonRadius = RADIUS.includes(buttonRadius)
    ? buttonRadius
    : RADIUS[0];
  return clickable ? (
    <button
      id ={id}
      className={`${styles["btn"]} ${styles[checkButtonStyle]} ${styles[checkButtonSize]} ${styles[checkButtonRadius]}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  ) : (
    <button
      disabled
      id ={id}
      className={`${styles["btn"]} ${styles[checkButtonStyle]} ${styles[checkButtonSize]} ${styles[checkButtonRadius]}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

GeneralButton.defaultProps = {
  clickable: true,
};
