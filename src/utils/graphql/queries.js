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

export const GET_ALL_RECIPE = gql`
  query ($userId: String!) {
    getRecipes(userId: $userId) {
      id
      name
    }
  }
`;

export const GET_RECIPE_BY_ID = gql`
  query GetRecipe($userId: String!, $cakeId: Int!) {
    getRecipeById(userId: $userId, cakeId: $cakeId) {
      id
      name
      ingredients {
        id
        amount        
        name
        measurement
        type        
      }
      steps {
        order
        description
      }
      phases {
        preparation_method
        time
        temperature
      }
      tags {
        tag_type
      }
    }
  }
`;
