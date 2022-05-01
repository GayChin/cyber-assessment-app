import React from "react";
import "./GenericBanner.scss";
import {Container, Row, Col} from "react-bootstrap";
import {GeneralButton} from "../GeneralButton/GeneralButton";

const Search = ({searching}) => {
  return (
    <div className="searchFormGenericBanner">
      <form className="form-style" action="/" method="get">
        <input
          type="text"
          id="searchBarGenericBanner"
          placeholder={" Search " + searching}
          name={"search" + searching}
          className="searchBarGenericBanner"
        />
        <span>
          <GeneralButton
            text={`SEARCH`}
            buttonStyle="btn-medium-state-blue"
            buttonSize="btn-extra-small"
            type="submit"
          />
        </span>
      </form>
    </div>
  );
};

const GenericBanner = ({title, searchBar, thingsToSearch, id}) => {
  return (
    <div className="genericBanner">
      <Container>
        <Row>
          <Col xs={9} sm={true} className="px-0">
            <h3 className="genericBannerHeader">{title}</h3>
          </Col>
          <Col xs="auto" className="px-0">
            {searchBar === true ? <Search searching={thingsToSearch} /> : <></>}
          </Col>
        </Row>
        <Row>
          <br />
        </Row>
        <Row>
          <Col xs={12} md={6} sm={12} className="px-0">
            <p className="genericBannerDescription" id={id}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Id
              consectetur purus ut faucibus pulvinar. Neque laoreet suspendisse
              interdum consectetur libero id. Cras adipiscing enim eu turpis
              egestas pretium aenean. Ut tristique et egestas quis ipsum.
            </p>
          </Col>
        </Row>
        <Row>
          <br />
        </Row>
      </Container>
    </div>
  );
};

export default GenericBanner;
