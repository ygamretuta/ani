import React, {useEffect, useState} from "react";

import { useLazyQuery } from '@apollo/client';

import { makeStyles, styled } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Box from '@material-ui/core/Box';

import SearchBar from "material-ui-search-bar";

import { Link, useHistory, useLocation } from 'react-router-dom';

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import AnimeCard from "components/AnimeCard/AnimeCard.js";
import AnimeDialog from "components/AnimeDialog/AnimeDialog.js";

import GET_ANIMES from 'queries/GetAnimes.js';
import GET_ANIME from 'queries/GetAnime.js';

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import { cardTitle } from "assets/jss/material-kit-react.js";

const MainSearchBar = styled(SearchBar)({
  marginTop: 20,
});

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  paginationButton:{
    marginRight: 10,
  },
  pagination: {
    '& > *' : {
      marginTop: theme.spacing(4),
    },
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    marginBottom: "30px",
    marginTop: "30px",
  },
  ...styles,
  ...imagesStyles,
  cardTitle
}));

export default function SectionGql() {
  const classes = useStyles();

  const [search, setSearch] = useState(''),
    [currentPage, setCurrentPage] = useState(1),
    [lastPage, setLastPage] = useState(1),
    [dialogOpen, setDialogOpen] = useState(false),
    [currentId, setCurrentId] = useState(undefined),
    [animeCard, setAnimeCard] = useState(undefined);

  let history = useHistory();

  const [getAnimes, {loading, error, data}] = useLazyQuery(GET_ANIMES, {
    onCompleted: data => {
      console.table(data);
      setLastPage(data.Page.pageInfo.lastPage);
    }
  });

  const [getAnime, {animeLoading, animeError, anime}] = useLazyQuery(GET_ANIME, {
    onCompleted: anime => {
      setDialogOpen(true);
      setAnimeCard(anime);
    }
  });

  const location = useLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get('search')) {
      setSearch(params.get('search') || '');

      if (params.get('page')) {
        setCurrentPage(+params.get('page') ?? 1);
      }
    }
  }, []);

  useEffect(()=> {
    if (search) {
      getAnimes({
        variables: {
          search: search,
          page: currentPage,
          perPage: 6
        },
      });
      console.log(data);
    }

  }, [search, currentPage]);

  useEffect(() => {
    if (currentId) {
      getAnime({
        variables: {
          id: currentId,
        },
      });
    }
  }, [currentId]);

  function handleCancel() {
    setSearch('');
  }

  function handlePageGo(event, pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleSearch(newKey) {
    setSearch(newKey)
    history.push(`/gql-page?search=${newKey}`)
  }

  function handleCardClick(id) {
    setDialogOpen(true);
    setCurrentId(id);
  }

  function handleDialogClose() {
    setAnimeCard(undefined);
    setDialogOpen(false);
  }

  if (loading || animeLoading) {
    return(
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    );
  }

  if (error || animeError) return <p>Error!</p>

  return(
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>GraphQL</h2>
        </div>

        <GridContainer>
          <GridItem>
            <MainSearchBar
              value={search}
              onRequestSearch={(newKey) => handleSearch(newKey)}
              onCancelSearch={() => handleCancel()}
            />
          </GridItem>

          {data && data.Page.media.map((anime) =>
            <GridItem sm={3} key={`grid-${anime.id}`}>
              <AnimeCard anime={anime} handleCardClick={handleCardClick}/>
            </GridItem>
          )}
        </GridContainer>
  
        {data &&
          <Box className={classes.pagination}>
            <Pagination 
              count={lastPage} 
              page={currentPage} 
              onChange={handlePageGo} 
              renderItem={(item)=> (
                <PaginationItem
                  component={Link}
                  to={`/gql-page?search=${search}&page=${item.page}`}
                  {...item}
                />
              )}  
            />
          </Box>
        }

        <AnimeDialog onClose={handleDialogClose} open={dialogOpen} anime={animeCard} />
      </div>
    </div>      
  ); 
}