import React, {useEffect, useState} from "react";

import { gql } from '@apollo/client';
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

  const [search, setSearch] = useState(''),
    [currentPage, setCurrentPage] = useState(1),
    [lastPage, setLastPage] = useState(1);


  let history = useHistory();

  const [getAnimes, {loading, error, data}] = useLazyQuery(GET_ANIMES, {
    onCompleted: data => {
      console.table(data);
      setLastPage(data.Page.pageInfo.lastPage);
    }
  });

  const location = useLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    setSearch(params.get('search') || '');
    setCurrentPage(+params.get('page') ?? 1)

  }, []);

  useEffect(()=> {
    console.log('Search Changed!');
    console.table(search);
    
    getAnimes({
      variables: {
        search: search,
        page: currentPage,
        perPage: 6
      },
    });
  }, [search, currentPage]);

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
              onRequestSearch={(newKey) => handleSearch(newKey)}
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
      </div>
    </div>      
  ); 
}