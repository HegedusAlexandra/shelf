import { gql } from "@apollo/client";

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

export const GET_RECIPE_BY_ID = gql`
  query ($id: ID!) {
    getRecipeById(id: $id) {
      id
      name
      ingredients {
        id
        ingredient {
          id
          name
          measurement
        }
        amount
      }
      steps {
        id
        order
        value
      }
    }
  }
`;
