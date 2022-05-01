import React from "react";
import styles from "./SmallCard.module.scss";
import smallCardImg from "../../images/smallCardImg.png";
import {Link} from "react-router-dom";

const SmallCard = ({title, description, id, tourId, url, nonClickable}) => {
  if (description.length >= 125) {
    description = description.slice(0, 125);
    description = description + " ...";
  }
  return (
    <>
      {nonClickable ? (
        <div id={tourId} className={styles["card-container"]}>
          <div className={styles["image-container"]}>
            <img src={smallCardImg} alt="small card img"></img>
            <span style={{color: "#524ca6"}} className={styles["card-title"]}>
              {title}
            </span>
          </div>
          <div className={styles["description-container"]}>{description}</div>
        </div>
      ) : (
        <Link to={url} style={{textDecoration: "None"}}>
          <div className={styles["card-container"]}>
            <div className={styles["image-container"]}>
              <img src={smallCardImg} alt="small card img"></img>
              <span style={{color: "#524ca6"}} className={styles["card-title"]}>
                {title}
              </span>
            </div>
            <div className={styles["description-container"]}>{description}</div>
          </div>
        </Link>
      )}
    </>
  );
};

export default SmallCard;
