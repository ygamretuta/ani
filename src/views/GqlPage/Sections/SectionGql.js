import React, {useState} from "react";

import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';

import { makeStyles, styled } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';


import SearchBar from "material-ui-search-bar";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

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
  ...styles,
  ...imagesStyles,
  cardTitle
}));

const GET_ANIMES = gql`
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, type: ANIME, search: $search) {
        id
        title {
            english
            romaji
        }
        startDate{
            year
            month
            day
        }
        description
        averageScore
        coverImage {
            extraLarge
        }
      }
    }
  }`;

export default function SectionGql() {
  const classes = useStyles();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [getAnimes, {loading, error, data}] = useLazyQuery(GET_ANIMES, {
    onCompleted: data => {
      console.table(data);
      setLastPage(data.Page.pageInfo.lastPage);
    }
  });

  function handleCancel() {
    setSearch('');
  }

  function handlePageGo(event, pageNumber) {
    setCurrentPage(pageNumber);

    getAnimes({
      variables: {
        search: search,
        page: pageNumber,
        perPage: 6
      }
    });
  }

  function handleSearch() {
    console.log(`Searching For: ${search}`);

    getAnimes({
      variables: {
        search: search,
        perPage: 6
      }
    });
  }

  if (loading) {
    return(
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    );
  }

  if (error ) return <p>Error!</p>

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
              onChange={(newSearch) => setSearch(newSearch)}
              onRequestSearch={() => handleSearch()}
              onCancelSearch={() => handleCancel()}
            />
          </GridItem>

          {data && data.Page.media.map((anime) =>
            <GridItem sm={3} key={`grid-${anime.id}`}>
              <Card>
                <img style={{height: "250px", widht: "100%", display: "block"}}
                  className={classes.imgCardTop}
                  src={anime.coverImage.extraLarge}
                  alt={anime.title.english || anime.title.romaji}
                />
                <CardBody>
                  <h4 className={classes.cardTitle}>{anime.title.english || anime.title.romaji}</h4>
                </CardBody>
              </Card>
            </GridItem>
          )}
        </GridContainer>
  
        {data &&
          <Box className={classes.pagination}>
            <Pagination count={lastPage} page={currentPage} onChange={handlePageGo} />
          </Box>
        }
      </div>
    </div>      
  ); 
}