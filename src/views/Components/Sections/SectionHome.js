import React from "react";

import { makeStyles } from "@material-ui/core";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import { cardTitle } from "assets/jss/material-kit-react.js";


const homeStyles = {
  ...imagesStyles,
  ...styles,
  cardTitle
}
const useStyles = makeStyles(homeStyles);

export default function SectionHome() {
  const classes = useStyles();
  
  return(
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>Projects</h2>
        </div>

        <GridContainer>
          <GridItem sm={4}>
            <Card>
              <img
                style={{height: "180px", width: "100%", display: "block"}}
                className={classes.imgCardTop}
                src="https://via.placeholder.com/350x180"
                alt="Card-img-cap"
              />
              <CardBody>
                <h4 className={classes.cardTitle}>CardTitle</h4>
                <p></p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem sm={4}>
            <Card>
              <img
                style={{height: "180px", width: "100%", display: "block"}}
                className={classes.imgCardTop}
                src="https://via.placeholder.com/350x180"
                alt="Card-img-cap"
              />
              <CardBody>
                <h4 className={classes.cardTitle}>CardTitle</h4>
                <p></p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem sm={4}>
           <Card>
              <img
                style={{height: "180px", width: "100%", display: "block"}}
                className={classes.imgCardTop}
                src="https://via.placeholder.com/350x180"
                alt="Card-img-cap"
              />
              <CardBody>
                <h4 className={classes.cardTitle}>CardTitle</h4>
                <p></p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}