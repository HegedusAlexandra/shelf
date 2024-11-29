import { gql } from "@apollo/client";

export const ADD_RECIPE = gql`
  mutation AddRecipe(
    $recipeName: String!
    $steps: [StepInput!]!
    $ingredients: [IngredientInput!]!
    $phases: [PhaseInput!]!
    $tags: [TagInput!]!
  ) {
    addRecipe(
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