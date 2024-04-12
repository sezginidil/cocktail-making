import { z } from 'zod'; 
  
export const ingredientSchema = z.object({ 
    id: z.number(), 
    name: z.string(), 
    quantity: z.number().min(0), 
    unit: z.string(), 
  }); 
   
  export const stockSchema = z.object({ 
    stock: z.array(ingredientSchema), 
  }); 
   
  export const recipeSchema = z.object({ 
    amount: z.number(), 
    available: z.number().optional() 
  }); 
   
  export const drinkSchema = z.object({ 
    id: z.number(), 
    name: z.string(), 
    description: z.string(),
    recipe: z.record(recipeSchema), 
  }); 
   
  export const drinksSchema = z.object({ 
    drinks: z.array(drinkSchema), 
  }); 
 
  export type IngredientSchema = z.infer<typeof ingredientSchema> 
 
  export type StockSchema = z.infer<typeof stockSchema> 
 
  export type DrinkSchema = z.infer<typeof drinkSchema> 
 
  export type RecipeSchema = z.infer<typeof recipeSchema> 