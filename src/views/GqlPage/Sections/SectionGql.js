import React, {useState} from "react";

import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';

import { makeStyles } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  paginationButton:{
    marginRight: 10  
  },
  ...styles
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
      console.log('Last Page');
      setLastPage(data.Page.pageInfo.lastPage);
    }
  });

  function handleCancel() {
    setSearch('');
  }

  function handlePageGo(pageNumber) {
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
    getAnimes({
      search: search,
      perPage: 6
    });
  }

  if (loading) {
    return(
      <Backdrop className={classes.backrop} open={true}>
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
      </div>
    </div>      
  ); 
}