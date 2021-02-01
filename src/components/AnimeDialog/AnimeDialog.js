import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles.js";
import PropTypes from "prop-types";

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(styles);

export default function AnimeDialog(props) {
  const classes = useStyles();
  const anime = props.anime;

  /*
  const stripTags = (html) => {
    let tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };*/
  return (
    <Dialog onClose={props.onClose} open={props.open}>
      {anime &&
        <>
          <DialogTitle>{anime.Media.title.romaji}</DialogTitle>
          <DialogContent>
            <Box>
              {anime.Media.trailer.thumbnail}
            </Box>
            <Typography>
              {anime.Media.description}
            </Typography>
          </DialogContent>
        </>
      }
  </Dialog>
  );
}

AnimeDialog.propTypes = {
  anime: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
