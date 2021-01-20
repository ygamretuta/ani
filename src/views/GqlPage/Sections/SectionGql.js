import React from "react";

import { makeStyles } from "@material-ui/core";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const gqlStyles = {
  ...styles
}
const useStyles = makeStyles(gqlStyles);

export default function SectionGql() {
  const classes = useStyles();

  return(
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>GraphQL</h2>
        </div>
      </div>
    </div>      
  ); 
}