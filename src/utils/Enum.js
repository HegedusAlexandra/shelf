// Enums for Recipe Properties
const TagType = Object.freeze({
  ELEMENT:"ELEMENT",
  DESSERT: "DESSERT",
  COOKIE: "COOKIE",
  DECORATION: "DECORATION",
  BREAKFAST: "BREAKFAST",
  SALTY: "SALTY",
  TEATIME_CAKE: "TEATIME_CAKE",
  PASTA: "PASTA",
  CREAM: "CREAM",
  PETITFOUR: "PETITFOUR",
  BONBON: "BONBON",
  BREAD: "BREAD",
  WARM: "WARM",
  LACTOSE_FREE: "LACTOSE_FREE",
  GLUTEN_FREE: "GLUTEN_FREE",
  SUGAR_FREE: "SUGAR_FREE",
  NUT_FREE: "NUT_FREE",
  VEGAN: "VEGAN",
  VEGETARIAN: "VEGETARIAN",
  NEW:"NEW"
});

const preparation_method = Object.freeze({
  COOKING:'COOKING',
  DYRING:'DRYING',
  PASSIVE_TIME: 'PASSIVE_TIME',
  SHAPING: 'SHAPING',
  MIXING: 'MIXING',
  RESTING:'RESTING',
  DECORATION: 'DECORATION',
  BAKING: 'BAKING',
  OTHER: 'OTHER',
  STEAMING: 'STEAMING',
  STEAMBAKING: 'STEAMBAKING'
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
export { TagType, preparation_method, Language, Sitemap, Navigation };
