import * as Yup from "yup";

const RecipeValidationSchema = Yup.object().shape({
  recipeName: Yup.string()
    .trim()
    .required("Recipe name is required."),
  steps: Yup.array()
    .of(
      Yup.string()
        .trim()
        .required("Each step must have a description.")
    )
    .min(1, "At least one step is required."),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required("Ingredient ID is required."),
        amount: Yup.number()
          .positive("Ingredient amount must be greater than zero.")
          .required("Ingredient amount is required."),
      })
    )
    .min(1, "At least one ingredient is required."),
  phases: Yup.array()
    .of(
      Yup.object().shape({
        preparationMethod: Yup.string().required(
          "Preparation method is required."
        ),
        bakingMethod: Yup.string().required("Baking method is required."),
        time: Yup.number()
          .positive("Time must be greater than zero.")
          .required("Time is required."),
        temperature: Yup.number()
          .min(0, "Temperature cannot be negative.")
          .required("Temperature is required."),
      })
    )
    .min(1, "At least one phase is required."),
  tags: Yup.array()
    .of(
      Yup.string()
        .trim()
        .required("Tag cannot be empty.")
    )
    .min(1, "At least one tag is required."),
});

export default RecipeValidationSchema;
