import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";

import styles from "assets/jss/material-kit-react/views/gqlPage.js";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function GqlPage() {
  const classes = useStyles();

  return(
    <div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <h1>Rar</h1>
          </div>
        </div>
      </div>
    </div>
  )
}