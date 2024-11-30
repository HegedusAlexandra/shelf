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
      userId:$userId
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