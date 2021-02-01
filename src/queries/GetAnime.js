import { gql } from '@apollo/client';

const GET_ANIME = gql`
  query ($id: Int) {
    Media (id: $id, type: ANIME) {
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
      trailer {
        id
        thumbnail
        site
      }
      averageScore
      coverImage {
        extraLarge
      }
    }
  }
`;

export default GET_ANIME;
