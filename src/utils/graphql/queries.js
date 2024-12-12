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
      tags {
        tag_type
      }
    }
  }
`;

export const GET_TODO = gql`
  query ($userId: ID!, $date: String) {
    getTodos(user_id: $userId, date: $date) {
      id
      title
      description
      start
      end_time
      iscompleted
    }
  }
`;

export const GET_TODAY_RECIPES = gql`
  query {
    getRecipesForToday {
      id
      start
      portions
      name
      recipe_id
    }
  }
`;

export const GET_TODOS = gql`
  query ($userId: ID!) {
    getTodos(user_id: $userId) {
      id
      title
      description
      start
      end_time
      duration
      recipe_id
      iscompleted
      portions
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
