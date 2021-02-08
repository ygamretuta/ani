import React from "react";
import { createStyles, makeStyles, withStyles, WithStyles, Theme } from "@material-ui/core/styles";
import styles from "./styles.js";
import PropTypes from "prop-types";

import Dialog from '@material-ui/core/Dialog';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import ShowMoreText from 'react-show-more-text';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    reviewsList: {
      width: '100%',
      backgroundColor: theme.palette.background.paper
    },
  }),
  styles);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.dialogTitle} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function AnimeDialog(props) {
  const classes = useStyles();
  const anime = props.anime;
  let genres = [];

  if (anime) {
    console.log(`splitting ${anime.Media.genres}`);
    let genreString = anime.Media.genres.toString();
    genres = genreString.match(/[A-Z][a-z]+/g);
  }

  /*
  const stripTags = (html) => {
    let tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };*/
  return (
    <Dialog onClose={props.onClose} open={props.open}>
      {anime ? (
        <>
          <DialogTitle onClose={props.onClose}>{anime.Media.title.romaji}</DialogTitle>
          <DialogContent dividers>
            <Box className={classes.ratingBox}>
              <Rating
                name="simple-controlled"
                value={(anime.Media.averageScore / 20)}
                readOnly
                precision={0.5}
                max={5}
              />
              {anime.Media.averageScore / 20}
            </Box>

            <Box>
              {genres.length > 0 && genres.map((genre, index) => 
                <Chip 
                  label={genre} 
                  key={`genre-${index}`} 
                  color="primary" 
                  component="a"
                  href="#chip"
                  variant="outlined"
                  size="small"
                  clickable
                />
              )}
            </Box>
            
            <ShowMoreText
              lines={3}
              more="Read More"
              expanded={false}>
              {anime.Media.description}
            </ShowMoreText>
            

            <Divider variant="inset"></Divider>
            <Typography variant="h6">Reviews</Typography>
            {anime.Media.reviews.edges.length > 0 ? ( 
              <List className={classes.reviewsList}>
                {anime.Media.reviews.edges.length > 0 && anime.Media.reviews.edges.map((review) => 
                  <React.Fragment key={`review-${review.node.id}`}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt={review.node.user.name} src={review.node.user.avatar.medium}/>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography>{review.node.user.name}</Typography>
                            <Rating 
                              value={(review.node.score / 20)}
                              readOnly
                              size="small"
                              precision={0.5}
                              max={5}
                            />
                          </React.Fragment>
                        }
                        secondary={review.node.summary}
                      >
                      </ListItemText>
                    </ListItem>
                    <Divider variant="inset"></Divider>
                  </React.Fragment>
                )}
              </List>
            ) : (
              <Typography variant="subtitle2">No reviews available</Typography>
            )}
          </DialogContent>

          <DialogActions>
            
          </DialogActions>
        </>
      ) : (
        <Skeleton variant="rect" width={210} height={118} />
      )}
  </Dialog>
  );
}

AnimeDialog.propTypes = {
  anime: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
