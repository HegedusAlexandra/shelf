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

export const GET_INGREDIENTS = gql`
  query {
    getIngredients {
      id
      name
      measurement
    }
  }
`;