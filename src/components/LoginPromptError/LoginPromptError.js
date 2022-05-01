import React from "react";
import styles from "./LoginPromptError.module.scss";

export default function SigninError(props) {
    return (
        <p className={styles.errorMessage}>{props.msg}</p>
    )
}
