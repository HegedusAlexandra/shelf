// Enums for Recipe Properties
const TagType = Object.freeze({
  DESSERT: "dessert",
  COOKIE: "cookie",
  DECORATION: "decoration",
  BREAKFAST: "breakfast",
  SALTY: "salty",
  TEATIME_CAKE: "teatime_cake",
  PASTA: "pasta",
  CREAM: "cream",
  PETITFOUR: "petitfour",
  BONBON: "bonbon",
  BREAD: "bread",
  WARM: "warm",
  LACTOSE_FREE: "lactose_free",
  GLUTEN_FREE: "gluten_free",
  SUGAR_FREE: "sugar_free",
  NUT_FREE: "nut_free",
  VEGAN: "vegan",
  VEGETARIAN: "vegetarian",
});

const PreparationMethod = Object.freeze({
  PASSIVE_TIME: "PASSIVE_TIME",
  SHAPING: "SHAPING",
  RESTING: "RESTING",
  DECORATION: "DECORATION",
  BAKING: "BAKING",
});

const BakingMethod = Object.freeze({
  NONE: "NONE",
  DRY_BAKING: "DRY_BAKING",
  STEAM_BAKING: "STEAM_BAKING",
  STEAM_AND_DRY_BAKING: "STEAM_AND_DRY_BAKING",
});

// Language and Navigation Constants
const Language = Object.freeze({
  EN: "en",
  HU: "hu",
});

const Navigation = Object.freeze({
  MAIN: "main",
  RECIPE: "recipe",
  STOCK: "stock",
});

const Sitemap = Object.freeze({
  HOME: "",
  DASHBOARD: "dashboard",
});

// Exporting all constants
export { TagType, PreparationMethod, BakingMethod, Language, Sitemap, Navigation };
