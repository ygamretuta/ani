import React from "react";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import { container } from "assets/jss/material-kit-react.js";
import AnimeHeader from "components/AnimeHeader";

const styles = {
  container,
  brand: {
    color: "#FFFFFF",
    textAlign: "left"
  },
  sections: {
    padding: "130px 0"
  },
  title: {
    fontSize: "2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative",
    margin: "10px 0 0"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px 0 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
};

const useStyles = makeStyles(styles);

export default function FirebaseDb() {
  const classes = useStyles();

  return(
    <>
      <AnimeHeader />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.sections}>
          <div className={classes.container}>
            <div className={classes.title}>Firebase Database Showcase</div>
          </div>
        </div>
      </div>
    </>
  );
}
