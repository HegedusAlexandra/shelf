import * as Yup from "yup";

const RecipeValidationSchema = Yup.object().shape({
  recipeName: Yup.string().required("Recipe name is required."),
  steps: Yup.array()
    .of(
      Yup.object().shape({
        order: Yup.number()
          .required("Step order is required.")
          .typeError("Step order must be a number."),
        description: Yup.string()
          .required("Step description is required.")
          .typeError("Step description must be a string."),
      })
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
        preparation_method: Yup.string().required(
          "Preparation method is required."
        ),
        time: Yup.number()
          .positive("Time must be greater than zero.")
          .required("Time is required."),
        temperature: Yup.number()
          .required("Temperature is required."),
      })
    )
    .min(1, "At least one phase is required."),
  tags: Yup.array()
    .of(
      Yup.object().shape({
        tag_type: Yup.string()
          .required("Tag name is required.")
          .typeError("Tag name must be a string."),
      })
    )
    .min(1, "At least one tag is required."),
});


export default RecipeValidationSchema;
