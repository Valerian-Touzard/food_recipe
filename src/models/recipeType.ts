export type RecipeType = {
  id: string;
  image_url: string;
  publisher: string;
  title: string;
};

export type RecipeDetail = {
  recipe: RecipeDetailType;
};

export type RecipeDetailType = {
  id: string;
  publisher: string;
  image_url: string;
  title: string;
  ingredients: IngredientType[];
};
export type IngredientType = {
  quantity: number | null;
  unit: string;
  description: string;
};
