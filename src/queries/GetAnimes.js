import { gql } from '@apollo/client';

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

  export default GET_ANIMES;
  