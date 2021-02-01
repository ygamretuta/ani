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
      averageScore
      coverImage {
        extraLarge
      }
    }
  }
`;

export default GET_ANIME;
