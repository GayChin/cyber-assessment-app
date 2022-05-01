import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./ResetPassword.module.scss";

class ResetPassword extends Component {
  render() {
    return (
      <div className={styles.resetCard}>
        <h3>Reset your password</h3>
        <Form.Group>
          <Form.Label>New password</Form.Label>
          <Form.Control
            name="newPassword"
            type="password"
            placeholder="Enter your new password here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Re-enter new password</Form.Label>
          <Form.Control
            name="confirmNewPassword"
            type="password"
            placeholder="Confirm your new password here"
          />
        </Form.Group>
        <div>
          <Button
            className={styles.changePasswordBtn}
            type="submit"
          >
            Change Password
          </Button>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
