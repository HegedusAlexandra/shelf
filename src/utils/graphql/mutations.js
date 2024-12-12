import { gql } from "@apollo/client";

export const ADD_RECIPE = gql`
  mutation AddRecipe(
    $userId: String!
    $recipeName: String!
    $steps: [StepInput!]!
    $ingredients: [IngredientInput!]!
    $phases: [PhaseInput!]!
    $tags: [TagInput!]!
  ) {
    addRecipe(
      userId: $userId
      name: $recipeName
      steps: $steps
      ingredients: $ingredients
      phases: $phases
      tags: $tags
    ) {
      id
      name
    }
  }
`;
export const ADD_TODO = gql`
  mutation AddTodo(
    $userId: ID!
    $title: String!
    $iscompleted: Boolean
    $start: String!
    $end_time: String!
    $duration: Int!
    $description: String
    $recipeId: Int
  ) {
    addTodo(
      userId: $userId
      title: $title
      iscompleted: $iscompleted
      start: $start
      end_time: $end_time
      duration: $duration
      description: $description
      recipeId: $recipeId
    ) {
      id
      title
      start
      end_time
      iscompleted
      description
    }
  }
`;
export const DELETE_TODO = gql`
  mutation DeleteTodo($userId: ID!, $todoId: ID!) {
    deleteTodo(
      todoId:$todoId
      userId: $userId
    )
  }
`;
export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($userId: ID!, $recipeId: ID!) {
    deleteRecipe(
      recipeId:$recipeId
      userId: $userId
    )
  }
`;
