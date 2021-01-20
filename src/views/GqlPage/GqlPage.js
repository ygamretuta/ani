import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

import { makeStyles } from "@material-ui/core";

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionGql from "./Sections/SectionGql.js";

import styles from "assets/jss/material-kit-react/views/gqlPage.js";

const gqlStyles = {
  ...styles
};

const useStyles = makeStyles(gqlStyles);

export default function GqlPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  return(
    <div>
      <Header
        brand="Ygam's Portfolio Site"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionGql></SectionGql>
      </div>
    </div>
  )
}