import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query {
    getBooks {
      id
      title
      author
      publishedYear
    }
  }
`;