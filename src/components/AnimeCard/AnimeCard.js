import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/app/animeCardStyle.js";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles(styles);

export default function AnimeCard(props) {
  const classes = useStyles();
  const anime = props.anime;

  return(
    <Card className={classes.card}>
      <CardActionArea onClick={() => props.handleCardClick(anime.id)}>
        <CardMedia
          component="img"
          height="250"
          image={anime.coverImage.extraLarge}
          alt={anime.title.english || anime.title.romaji}
          title={anime.title.english || anime.title.romaji}
        />
        <CardContent>
          <h4 className={classes.cardTitle}>{anime.title.english || anime.title.romaji}</h4>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

AnimeCard.propTypes = {
  anime: PropTypes.object,
  handleCardClick: PropTypes.func,
};
