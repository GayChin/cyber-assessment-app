import React from "react";
import "./Footer.scss";
import paperPlaneTilt from "./paperPlaneTilt.svg";
import phone from "./phone.svg";
import youtube from "./youtube.svg";
import facebook from "./facebook.svg";
import linkedIn from "./linkedIn.svg";
import twitter from "./twitter.svg";
import { Row, Col } from "react-bootstrap";
import { store } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setToastAndMsg, setIsTourRunning } from "../../redux/general/generalSlice";
import { setTourIdx } from "../../redux/general/generalSlice";
function Footer() {
  const dispatch = useDispatch();
  const displayToast = useSelector((state) => state.general.displayToast);

  const onClick = () => {
    const userLoggedOn = store.getState().user.userProfile.email;
    if (!userLoggedOn) {
      if (!displayToast) {
        dispatch(setToastAndMsg({displayToast: true, toastMsg: "Please Log In"}));
        setTimeout(() => {
          dispatch(setToastAndMsg({displayToast: false, toastMsg: ""}));
        }, 3000);
      }
    }
    else {
      dispatch(setTourIdx(0));
      dispatch(setIsTourRunning(true));
    }
  };


  return (
    <footer className="container-fluid">
      <Row className="footerNewtoDR align-items-center">
        <Col>
          <h3>New to Digital Resilience?</h3>
          <button className="tour-btn" onClick={() => onClick()}>
            Take a tour
          </button>
        </Col>
      </Row>
      {/* //ml-md-5 mr-md-5 */}
      <div className="row d-flex justify-content-evenly justify-content-md-center ml-auto mr-auto pt-3 text-center">
        <div className="d-flex flex-column col-12 col-md-3">
          <div className="font-weight-bold p-3">COMPANY</div>
          <div id="footerCompany">
            <div className="d-flex flex-column px-3">
              <a className="nostyle p-1" href="/">
                About Us
              </a>
              <a className="nostyle p-1" href="/">
                Our services
              </a>
              <a className="nostyle p-1" href="/">
                Privacy Policy
              </a>
              <a className="nostyle p-1" href="/">
                Terms of use
              </a>
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-column col-12 col-md-3 mt-2 mt-md-0"
          id="links"
        >
          <div className="font-weight-bold p-3">CONTACT US</div>
          <div id="footerContactUs">
            <div className="d-flex flex-column px-3">
              <Row>
                <Col className="py-1">
                  <a
                    className="iconMembesarkan p-1"
                    target="_blank"
                    href="mailto:supports@drsbx.com"
                    rel="noreferrer"
                  >
                    <img
                      className="py-1 pr-1"
                      src={paperPlaneTilt}
                      alt="Email Us"
                    />
                    supports@drsbx.com
                  </a>
                </Col>
              </Row>
              <Row>
                <Col className="py-1">
                  <a
                    className="iconMembesarkan p-1"
                    target="_blank"
                    href="http://whatsapp.com"
                    rel="noreferrer"
                  >
                    <img className="py-1 pr-1" src={phone} alt="Contact Us" />
                    +123-24721905
                  </a>
                </Col>
              </Row>
              <div className="py-1">
                <a
                  className="iconMembesarkan"
                  target="_blank"
                  href="http://youtube.com"
                  rel="noreferrer"
                >
                  <img
                    className="fourSocialMediaIcon"
                    src={youtube}
                    alt="Youtube"
                  />
                </a>
                <a
                  className="iconMembesarkan"
                  target="_blank"
                  href="http://facebook.com"
                  rel="noreferrer"
                >
                  <img
                    className="fourSocialMediaIcon"
                    src={facebook}
                    alt="Facebook"
                  />
                </a>
                <a
                  className="iconMembesarkan"
                  target="_blank"
                  href="http://linkedin.com"
                  rel="noreferrer"
                >
                  <img
                    className="fourSocialMediaIcon"
                    src={linkedIn}
                    alt="LinkedIn"
                  />
                </a>
                <a
                  className="iconMembesarkan"
                  target="_blank"
                  href="http://twitter.com"
                  rel="noreferrer"
                >
                  <img
                    className="fourSocialMediaIcon"
                    src={twitter}
                    alt="Twitter"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column col-12 col-md-3 mt-2 mt-md-0">
          <div className="font-weight-bold p-3">ADDRESS</div>
          <div id="footerAddress">
            <div className="d-flex flex-column px-3">
              <span className="pt-2">
                98 Shirley Street Pimpana QLD 4209 Australia
              </span>
            </div>
          </div>
        </div>
      </div>
      <div id="footerCopyright">
        <p>&copy; 2021 DRSBX</p>
      </div>
    </footer>
  );
}

export default Footer;
