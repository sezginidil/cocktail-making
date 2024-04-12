// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { DrinkSchema, IngredientSchema, RecipeSchema } from '../data/dto/dto.objects';
import { StockService } from './stock.service';


@Injectable()
export class DrinkService {
  constructor(
    private readonly stockService: StockService) {}

    private calculateAvailableIngredients(drink: DrinkSchema, stock: IngredientSchema[]): Record<string, RecipeSchema> {
      const calculatedIngredients: Record<string, RecipeSchema> = {};
      for (const [ingredient, { amount }] of Object.entries(drink.recipe)) {
        const stockIngredient = stock.find((item) => item.name === ingredient);
        const availableAmount = stockIngredient ? stockIngredient.quantity : 0;
        calculatedIngredients[ingredient] = { amount, available: availableAmount };
      }
      return calculatedIngredients;
    }
  
    private calculateAvailableAmountsForDrink(drink: DrinkSchema, stock: IngredientSchema[]): DrinkSchema {
      const calculatedIngredients = this.calculateAvailableIngredients(drink, stock);
  
      return {
        id: drink.id,
        name: drink.name,
        description: drink.description,
        recipe: calculatedIngredients,
      };
    }
    
    async calculateAvailableDrinks(): Promise<DrinkSchema[]> {
      const stock = await this.stockService.fetchStock();
      const drinks = await this.stockService.fetchDrinks();
  
      const drinksWithAvailableAmounts = drinks.map((drink) =>
        this.calculateAvailableAmountsForDrink(drink, stock)
      );
  
      return drinksWithAvailableAmounts;
    }
  
    async getRecipeWithAvailableAmounts(name: string): Promise<DrinkSchema> {
      const stock = await this.stockService.fetchStock();
      const drinks = await this.stockService.fetchDrinks();
      const drink = drinks.find((item) => item.name === name);
  
      if (!drink) {
        throw new Error(`Drink '${name}' not found.`);
      }
  
      return this.calculateAvailableAmountsForDrink(drink, stock);
    }

    async isDrinkAvailable(name: string): Promise<boolean> {
      const drink = await this.getRecipeWithAvailableAmounts(name);
  
      return Object.values(drink.recipe).every((ingredient) => ingredient.amount <= ingredient.available);
    }

    async orderDrink(name: string): Promise<DrinkSchema> {
      const isAvailable = await this.isDrinkAvailable(name);
  
      if (!isAvailable) {
        throw new Error(`Drink '${name}' is not available.`);
      }
  
      const stock = await this.stockService.fetchStock();
      const drink = await this.getRecipeWithAvailableAmounts(name);
  
      for (const [ingredient, { amount }] of Object.entries(drink.recipe)) {
        const stockIngredient = stock.find((item) => item.name === ingredient);
        if (stockIngredient) {
          stockIngredient.quantity -= amount;
        }
      }
  
      await this.stockService.saveStock(stock);
  
      return this.calculateAvailableAmountsForDrink(drink, stock);
    }


}